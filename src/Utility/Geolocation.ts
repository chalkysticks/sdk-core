import * as Event from '../Event/index.js';
import * as Exception from '../Exception/index.js';
import { Cache } from './Cache.js';
import { toRadians, toDegrees, EARTH_RADIUS } from './Math.js';

/**
 * @type interface
 */
export interface IGeolocationPayload {
	hasOccurred?: boolean;
	position: GeolocationPosition;
	stale?: boolean;
	timestamp: number;
}

/**
 * @type interface
 */
export interface IGeolocationCallback {
	(payload: IGeolocationPayload): void;
}

/**
 * @type interface
 */
export interface ICoordinateBounds {
	latitudeMin: number;
	latitudeMax: number;
	longitudeMin: number;
	longitudeMax: number;
}

/**
 * @type interface
 */
export interface IPAPIResponse {
	latitude: number;
	longitude: number;
	city: string;
	country: string;
}

/**
 * @internal Used to reuse the same native watch across subscribers
 */
interface ISubscriber {
	callback: IGeolocationCallback;
}

/**
 * @type object
 */
export const config = {
	IP_LOCATION_API: 'https://ipapi.co/json/',
};

/**
 * Cache expiration of 2 minutes for the geolocation
 *
 * @type number
 */
export const CACHE_EXPIRATION = 1000 * 6 * 2;

/**
 * Request geolocation permissions from the user
 *
 * This function will prompt the user to grant geolocation permissions
 * and returns the result as a promise. It works across browser and Capacitor
 * environments, with appropriate fallbacks.
 *
 * @return Promise<boolean> True if permissions were granted, false otherwise
 */
export async function requestLocation(): Promise<PermissionState> {
	// 1. If Permissions API unsupported, fall back to "just try" approach
	if (!navigator.permissions) {
		try {
			await new Promise<void>((resolve, reject) => navigator.geolocation.getCurrentPosition(() => resolve(), reject, { timeout: 10000 }));
			return 'granted';
		} catch {
			return 'denied';
		}
	}

	// 2. Permissions API supported
	const status = await navigator.permissions.query({ name: 'geolocation' });

	// If still in "prompt", trigger a one‑shot request so the user actually sees the dialog
	if (status.state === 'prompt') {
		try {
			await new Promise<void>((resolve, reject) => navigator.geolocation.getCurrentPosition(() => resolve(), reject, { timeout: 10000 }));
			return 'granted';
		} catch {
			return 'denied';
		}
	}

	return status.state; // 'granted' or 'denied'
}

/**
 * Prevent us from hitting the geolocation services all the time
 *
 * @type Cache
 */
export const IP_LOCATION_ENDPOINT = 'https://ipapi.co/json/';
export const CACHE_EXPIRATION_MS = 1000 * 60 * 2; // 2 minutes
export const cache = new Cache(CACHE_EXPIRATION);

const subscribers: ISubscriber[] = [];
let latestPayload: IGeolocationPayload | null = null;
let nativeWatchId: number | null = null;

/**
 * Get location explicitly either through browser events, Capacitor, or IP-based fallback
 *
 * @return Promise<IGeolocationPayload>
 */
export async function getLocation(): Promise<IGeolocationPayload> {
	if (latestPayload) return latestPayload;

	// Use persistent cache
	const cached = cache.get('geolocation');

	if (cached) {
		latestPayload = cached;
		console.log('🔸 Cached location', cached);
		return cached;
	}

	// Otherwise perform a one-shot lookup (browser → capacitor → IP)
	return await obtainFreshLocation();
}

/**
 * Start watching the user’s position. Multiple callers share one
 * underlying native watch but receive their own callbacks.
 *
 * @param IGeolocationCallback callback   Invoked when position changes
 * @return () => void                     Call to unsubscribe
 */
export function watchLocation(callback: IGeolocationCallback): () => void {
	const subscriber: ISubscriber = { callback };
	subscribers.push(subscriber);

	// If a payload already exists (cache or earlier watch) push it now.
	if (latestPayload) {
		callback(latestPayload);
	}

	// Lazily create the native watch
	if (nativeWatchId === null) {
		nativeWatchId = createNativeWatch();
	}

	// Return an unsubscribe function
	return (): void => {
		const index = subscribers.indexOf(subscriber);
		if (index !== -1) subscribers.splice(index, 1);

		// No more listeners → tear the watch down
		if (subscribers.length === 0 && nativeWatchId !== null && navigator?.geolocation) {
			navigator.geolocation.clearWatch(nativeWatchId);
			nativeWatchId = null;
		}
	};
}

/**
 * Stop *all* watching activity immediately (convenience).
 *
 * @return void
 */
export function clearWatch(): void {
	subscribers.splice(0);

	if (nativeWatchId !== null && navigator?.geolocation) {
		navigator.geolocation.clearWatch(nativeWatchId);
		nativeWatchId = null;
	}
}

/**
 * Creates the single underlying watchPosition and wires success/error
 * handling. Returns the native watchId so we can clear it later.
 *
 * @return number
 */
function createNativeWatch(): number {
	if (!navigator?.geolocation) {
		console.warn('🔺 Geolocation API unavailable, falling back to IP only.');
		rolloverToIpFallback();
		return 0;
	}

	return navigator.geolocation.watchPosition(handleNativeSuccess, handleNativeError, {
		enableHighAccuracy: true,
		maximumAge: 0,
		timeout: 15000,
	});
}

/**
 * Success handler for the browser’s watchPosition.
 * Pushes the reading to all subscribers and caches it.
 *
 * @param GeolocationPosition position
 * @return void
 */
function handleNativeSuccess(position: GeolocationPosition): void {
	const payload: IGeolocationPayload = {
		position: position,
		timestamp: Date.now(),
	};

	// Avoid emitting duplicates
	if (isSamePosition(payload)) return;

	cacheAndDispatch(payload);
}

/**
 * Error handler for the browser’s watchPosition.
 * If we never had a good fix yet, fall back to IP. Otherwise ignore.
 *
 * @param GeolocationPositionError error
 * @return Promise<void>
 */
async function handleNativeError(error: GeolocationPositionError): Promise<void> {
	if (latestPayload && !latestPayload.stale) {
		console.info('⚠️  Ignoring late geolocation error:', error.message);
		return;
	}

	await rolloverToIpFallback();
}

/**
 * Tries an IP lookup and dispatches it (marked stale:true).
 *
 * @return Promise<void>
 */
async function rolloverToIpFallback(): Promise<void> {
	try {
		const position = await getIpLocation();
		const payload: IGeolocationPayload = {
			position: position,
			stale: true,
			timestamp: Date.now(),
		};
		cacheAndDispatch(payload);
	} catch (error) {
		console.error('❌ Failed IP fallback:', error);
		Event.Bus.dispatch('location:error', error);
	}
}

/**
 * IP-based lookup (city-level accuracy, ~5 km).
 *
 * @return Promise<GeolocationPosition>
 */
async function getIpLocation(): Promise<GeolocationPosition> {
	const response = await fetch(IP_LOCATION_ENDPOINT);
	if (!response.ok) throw new Error(`HTTP ${response.status}`);

	const data: IPAPIResponse = await response.json();

	console.log('🔺 IP location', data);

	return {
		coords: {
			accuracy: 5_000,
			altitude: null,
			altitudeAccuracy: null,
			heading: null,
			latitude: data.latitude,
			longitude: data.longitude,
			speed: null,
		},
		timestamp: Date.now(),
	} as GeolocationPosition;
}

/**
 * Browser / Capacitor one-shot chain used by getLocation()
 *
 * @return Promise<IGeolocationPayload>
 */
async function obtainFreshLocation(): Promise<IGeolocationPayload> {
	try {
		if (navigator?.geolocation) {
			const position = await new Promise<GeolocationPosition>((res, rej) =>
				navigator.geolocation.getCurrentPosition(res, rej, {
					enableHighAccuracy: true,
					timeout: 10000,
				}),
			);

			const payload = {
				position: position,
				timestamp: Date.now(),
			};

			cacheAndDispatch(payload);

			return payload;
		}

		throw new Error('Navigator API unavailable');
	} catch {
		// Capacitor?
		if (await isCapacitorGeolocationAvailable()) {
			try {
				const { Geolocation } = await import('@capacitor/geolocation');
				const position = (await Geolocation.getCurrentPosition()) as GeolocationPosition;
				const payload = {
					position: position,
					timestamp: Date.now(),
				};

				cacheAndDispatch(payload);

				return payload;
			} catch {
				/* fall through */
			}
		}

		// Last-ditch IP lookup
		await rolloverToIpFallback();

		if (latestPayload) return latestPayload;
		throw new Exception.Geolocation('All location methods failed.');
	}
}

/**
 * Stores in cache, updates latest, and notifies all listeners/UI.
 *
 * @param IGeolocationPayload payload
 * @returns void
 */
function cacheAndDispatch(payload: IGeolocationPayload): void {
	latestPayload = payload;
	cache.set('geolocation', payload, CACHE_EXPIRATION_MS);

	Event.Bus.dispatch('location:change', payload);
	subscribers.forEach(({ callback }) => callback(payload));
}

/**
 * Create a payload
 *
 * @param GeolocationPosition position
 */
function formPayload(position: GeolocationPosition): IGeolocationPayload {
	return {
		position: position,
		timestamp: Date.now(),
	};
}

// region: Utility
// ---------------------------------------------------------------------------

/**
 * Get the distance between two points
 *
 * @param number latitude1
 * @param number longitude1
 * @param number latitude2
 * @param number longitude2
 * @returns number
 */
export function distanceBetween(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
	const R = EARTH_RADIUS;
	const dLatitude = toRadians(latitude2 - latitude1);
	const dLongitude = toRadians(longitude2 - longitude1);
	const a =
		Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
		Math.cos(toRadians(latitude1)) * Math.cos(toRadians(latitude2)) * Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km
	return d;
}

/**
 * Get bearing of two directions
 *
 * @param number latitude1
 * @param number longitude1
 * @param number latitude2
 * @param number longitude2
 * @returns number
 */
export function getBearing(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
	const dLongitude = toRadians(longitude2 - longitude1);
	const y = Math.sin(dLongitude) * Math.cos(toRadians(latitude2));
	const x =
		Math.cos(toRadians(latitude1)) * Math.sin(toRadians(latitude2)) -
		Math.sin(toRadians(latitude1)) * Math.cos(toRadians(latitude2)) * Math.cos(dLongitude);
	const brng = toDegrees(Math.atan2(y, x));

	return (brng + 360) % 360;
}

/**
 * Get bounds of a circle around a point
 *
 * @param number latitude
 * @param number longitude
 * @param number radius
 * @returns ICoordinateBounds
 */
export function getBounds(latitude: number, longitude: number, radius: number): ICoordinateBounds {
	const R = EARTH_RADIUS; // Radius of the earth in km
	const latitude1 = toRadians(latitude);
	const longitude1 = toRadians(longitude);
	const d = radius / R; // Distance in km
	const bounds = {
		latitudeMin: toDegrees(latitude1 - d),
		latitudeMax: toDegrees(latitude1 + d),
		longitudeMin: toDegrees(longitude1 - d / Math.cos(latitude1)),
		longitudeMax: toDegrees(longitude1 + d / Math.cos(latitude1)),
	};

	return bounds;
}

/**
 * Check if a point is in a circular bounds
 *
 * @param number latitude
 * @param number longitude
 * @param ICoordinateBounds bounds
 * @returns boolean
 */
export function isPointInBounds(latitude: number, longitude: number, bounds: ICoordinateBounds): boolean {
	return latitude >= bounds.latitudeMin && latitude <= bounds.latitudeMax && longitude >= bounds.longitudeMin && longitude <= bounds.longitudeMax;
}

/**
 * Returns true if the new payload is the same as the previous one.
 *
 * @param IGeolocationPayload next
 * @return boolean
 */
function isSamePosition(next: IGeolocationPayload): boolean {
	if (!latestPayload) return false;

	return (
		latestPayload.position.coords.latitude === next.position.coords.latitude &&
		latestPayload.position.coords.longitude === next.position.coords.longitude &&
		(latestPayload.stale ?? false) === (next.stale ?? false)
	);
}

/**
 * Flexible way of simplifying lat/long coordinates from various providers.
 *
 * This is valuable because it helps prevent cache busting on HTTP urls
 * with overly precise floats.
 *
 * 	// Original format
 * 	simplifyCoordinates(40.7128, -74.0060);
 *
 * 	// Object format
 * 	simplifyCoordinates({ lat: 40.7128, lng: -74.0060 });
 *
 * 	// Array format
 * 	simplifyCoordinates([40.7128, -74.0060]);
 *
 * 	// Google Maps format
 * 	simplifyCoordinates({ position: { lat: 40.7128, lng: -74.0060 } });
 *
 * 	// With custom precision
 * 	simplifyCoordinates({ lat: 40.7128, lng: -74.0060 }, undefined, 1e5);
 *
 * @param coordinates The coordinates to simplify
 * @param longitudeOrRoundAmount The longitude or the round amount
 * @param roundAmount The round amount
 * @return object
 */
export function simplifyCoordinates(
	coordinates: CoordinateInput | number,
	longitudeOrRoundAmount?: number,
	roundAmount: number = 1e3,
): { latitude: number; longitude: number } {
	let latitude: number | undefined;
	let longitude: number | undefined;
	let precision = roundAmount;

	// Handle numeric inputs like (lat, lng)
	if (typeof coordinates === 'number' && typeof longitudeOrRoundAmount === 'number') {
		latitude = coordinates;
		longitude = longitudeOrRoundAmount;
		precision = roundAmount;
	}

	// Handle array format [lat, lng]
	else if (Array.isArray(coordinates)) {
		[latitude, longitude] = coordinates;
	}

	// Handle object formats
	else if (typeof coordinates === 'object' && coordinates !== null) {
		const getPropValue = (obj: any, key: string): number | undefined => {
			const value = obj?.[key];
			if (typeof value === 'function') return value();
			if (typeof value === 'number') return value;
			return undefined;
		};

		let source = coordinates;

		// Support Google Maps style: { position: { lat(), lng() } }
		if ('position' in coordinates) {
			source = coordinates.position;
		}

		latitude = getPropValue(source, 'latitude') ?? getPropValue(source, 'lat') ?? undefined;
		longitude = getPropValue(source, 'longitude') ?? getPropValue(source, 'lng') ?? undefined;
	}

	// Validate extracted values
	if (typeof latitude !== 'number' || typeof longitude !== 'number' || isNaN(latitude) || isNaN(longitude)) {
		console.warn('Invalid coordinates: must include numeric latitude and longitude.', {
			coordinates,
			longitudeOrRoundAmount,
			roundAmount,
		});
		return {
			latitude: 0,
			longitude: 0,
		};
	}

	// Return simplified coordinates
	return {
		latitude: Math.round(latitude * precision) / precision,
		longitude: Math.round(longitude * precision) / precision,
	};
}

// endregion: Utility

// region: Helpers
// ---------------------------------------------------------------------------

type CoordinateInput =
	| { lat?: number; latitude?: number; lng?: number; longitude?: number }
	| [number, number]
	| { position: { lat: number; lng: number } }
	| [latitude: number, longitude: number];

/**
 * Check if Capacitor Geolocation plugin is available dynamically
 */
async function isCapacitorGeolocationAvailable(): Promise<boolean> {
	try {
		const { Geolocation } = await import('@capacitor/geolocation');
		return !!Geolocation;
	} catch {
		return false;
	}
}

// endregion: Helpers
