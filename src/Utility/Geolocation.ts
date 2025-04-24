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
 * Prevent us from hitting the geolocation services all the time
 *
 * @type Cache
 */
export const cache = new Cache(CACHE_EXPIRATION);

/**
 * Get location explicitly either through browser events, Capacitor, or IP-based fallback
 *
 * @return Promise<IGeolocationPayload>
 */
export async function getLocation(): Promise<IGeolocationPayload> {
	const cacheKey = 'geolocation';
	const cachedLocation = cache.get(cacheKey);

	if (cachedLocation) {
		return cachedLocation;
	}

	try {
		if (navigator?.geolocation) {
			return await getBrowserLocation(cacheKey);
		} else if (await isCapacitorGeolocationAvailable()) {
			return await getCapacitorLocation(cacheKey);
		} else {
			return await getIPLocationFallback(cacheKey);
		}
	} catch (error) {
		throw error instanceof Error ? error : new Exception.Geolocation('Unknown error occurred');
	}
}

/**
 * Watch the user's geolocation
 *
 * @param IGeolocationCallback callback
 * @param PositionErrorCallback errorCallback
 * @param PositionOptions options
 * @returns number watchId
 */
export function watchLocation(
	callback?: IGeolocationCallback,
	errorCallback?: PositionErrorCallback,
	options: PositionOptions = { enableHighAccuracy: true },
): number {
	const cacheKey = 'geolocation';

	if (navigator?.geolocation) {
		return navigator.geolocation.watchPosition(
			(position: GeolocationPosition) => {
				const payload = formPayload(position);
				cache.set(cacheKey, payload, CACHE_EXPIRATION);
				Event.Bus.dispatch('location:change', payload);
				callback?.(payload);
			},
			async (error: GeolocationPositionError) => {
				try {
					const ipPosition = await getIPLocation();
					const payload = formPayload(ipPosition);
					cache.set(cacheKey, payload, CACHE_EXPIRATION);
					Event.Bus.dispatch('location:change', payload);
					callback?.(payload);
				} catch (ipError) {
					Event.Bus.dispatch('location:error', error);
					errorCallback?.(error);
				}
			},
			options,
		);
	}

	return 0;
}

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
			// Could be denied or unavailable – we can’t distinguish here
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
 * Clear the watch
 *
 * @param number watchId
 * @returns void
 */
export function clearWatch(watchId: number): void {
	try {
		if (!navigator?.geolocation) {
			throw new Exception.Geolocation('Geolocation is not supported by this browser.');
		}

		navigator.geolocation.clearWatch(watchId);
	} catch (error) {
		console.error('Error clearing geolocation watch:', error);
	}
}

/**
 * Get location using browser geolocation API
 *
 * @param string cacheKey
 * @return Promise<IGeolocationPayload>
 */
async function getBrowserLocation(cacheKey: string): Promise<IGeolocationPayload> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				const payload = formPayload(position);
				cache.set(cacheKey, payload, CACHE_EXPIRATION);
				console.info('🔸 Location', payload);
				Event.Bus.dispatch('location:change', payload);
				resolve(payload);
			},
			async (error: GeolocationPositionError) => {
				console.warn('Browser geolocation error:', error);

				if (error.code === error.PERMISSION_DENIED) {
					reject(new Exception.Geolocation('Permission denied for geolocation.'));
				} else if (error.code === error.POSITION_UNAVAILABLE) {
					reject(new Exception.Geolocation('Geolocation position unavailable.'));
				} else if (error.code === error.TIMEOUT) {
					reject(new Exception.Geolocation('Geolocation request timed out.'));
				} else {
					try {
						const position = await getIPLocation();
						const payload = formPayload(position);
						cache.set(cacheKey, payload, CACHE_EXPIRATION);
						console.info('🔺 Location', payload);
						Event.Bus.dispatch('location:change', payload);
						resolve(payload);
					} catch (ipError) {
						reject(new Exception.Geolocation('Fallback IP location failed.'));
					}
				}
			},
		);
	});
}

/**
 * Get location using Capacitor Geolocation plugin
 *
 * @param string cacheKey
 * @return Promise<IGeolocationPayload>
 */
async function getCapacitorLocation(cacheKey: string): Promise<IGeolocationPayload> {
	try {
		const { Geolocation } = await import('@capacitor/geolocation');
		const position = (await Geolocation.getCurrentPosition()) as GeolocationPosition;
		const payload = formPayload(position);
		cache.set(cacheKey, payload, CACHE_EXPIRATION);
		console.info('🔹 Location', payload);
		Event.Bus.dispatch('location:change', payload);
		return payload;
	} catch (error) {
		try {
			const position = await getIPLocation();
			const payload = formPayload(position);
			cache.set(cacheKey, payload, CACHE_EXPIRATION);
			console.info('🔺 Location', payload);
			Event.Bus.dispatch('location:change', payload);
			return payload;
		} catch (ipError) {
			Event.Bus.dispatch('location:error', error);
			throw error;
		}
	}
}

/**
 * Get IP-based location as a fallback
 *
 * @param string cacheKey
 * @return Promise<IGeolocationPayload>
 */
async function getIPLocationFallback(cacheKey: string): Promise<IGeolocationPayload> {
	try {
		const ipPosition = await getIPLocation();
		const payload = formPayload(ipPosition);
		cache.set(cacheKey, payload, CACHE_EXPIRATION);
		console.info('🔺 Location', payload);
		Event.Bus.dispatch('location:change', payload);
		return payload;
	} catch (error) {
		Event.Bus.dispatch('location:error', error);
		throw new Exception.Geolocation('Failed to get IP location');
	}
}

/**
 * @return Promise<GeolocationPosition>
 */
async function getIPLocation(): Promise<GeolocationPosition> {
	const response = await fetch(config.IP_LOCATION_API);
	const data: IPAPIResponse = await response.json();

	return {
		coords: {
			accuracy: 5000, // City-level accuracy (~5km)
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
