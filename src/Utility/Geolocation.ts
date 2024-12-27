import * as Event from '../Event/index.js';
import * as Exception from '../Exception/index.js';
import { Cache } from './Cache.js';
import { toRadians, toDegrees, EARTH_RADIUS } from './Math.js';

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
interface IPAPIResponse {
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
 * @return Promise<GeolocationPosition>
 */
export async function getLocation(): Promise<GeolocationPosition> {
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
 * Get location using browser geolocation API
 *
 * @param string cacheKey
 * @return Promise<GeolocationPosition>
 */
/**
 * Get location using browser geolocation API
 *
 * @param string cacheKey
 * @return Promise<GeolocationPosition>
 */
async function getBrowserLocation(cacheKey: string): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position: GeolocationPosition) => {
				cache.set(cacheKey, position, CACHE_EXPIRATION);
				console.info('🔸 Location', position);
				Event.Bus.dispatch('location:change', position);
				resolve(position);
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
						cache.set(cacheKey, position, CACHE_EXPIRATION);
						console.info('🔺 Location', position);
						Event.Bus.dispatch('location:change', position);
						resolve(position);
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
 * @return Promise<GeolocationPosition>
 */
async function getCapacitorLocation(cacheKey: string): Promise<GeolocationPosition> {
	try {
		const { Geolocation } = await import('@capacitor/geolocation');
		const position = await Geolocation.getCurrentPosition();
		cache.set(cacheKey, position, CACHE_EXPIRATION);
		console.info('🔹 Location', position);
		Event.Bus.dispatch('location:change', position);
		return position;
	} catch (error) {
		try {
			const position = await getIPLocation();
			cache.set(cacheKey, position, CACHE_EXPIRATION);
			console.info('🔺 Location', position);
			Event.Bus.dispatch('location:change', position);
			return position;
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
 * @return Promise<GeolocationPosition>
 */
async function getIPLocationFallback(cacheKey: string): Promise<GeolocationPosition> {
	try {
		const position = await getIPLocation();
		cache.set(cacheKey, position, CACHE_EXPIRATION);
		console.info('🔺 Location', position);
		Event.Bus.dispatch('location:change', position);
		return position;
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
 * Watch the user's geolocation
 *
 * @param PositionCallback callback
 * @param PositionErrorCallback errorCallback
 * @param PositionOptions options
 * @returns number watchId
 */
export function watchLocation(
	callback?: PositionCallback,
	errorCallback?: PositionErrorCallback,
	options: PositionOptions = { enableHighAccuracy: true },
): number {
	const cacheKey = 'geolocation';

	if (navigator?.geolocation) {
		return navigator.geolocation.watchPosition(
			(position: GeolocationPosition) => {
				cache.set(cacheKey, position, CACHE_EXPIRATION);
				Event.Bus.dispatch('location:change', position);
				callback?.(position);
			},
			async (error: GeolocationPositionError) => {
				try {
					const ipPosition = await getIPLocation();
					cache.set(cacheKey, ipPosition, CACHE_EXPIRATION);
					Event.Bus.dispatch('location:change', ipPosition);
					callback?.(ipPosition);
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
	let lat: number;
	let lng: number;
	let precision = roundAmount;

	// Handle different input formats
	if (typeof coordinates === 'number' && typeof longitudeOrRoundAmount === 'number') {
		// Original format: (latitude, longitude, roundAmount?)
		lat = coordinates;
		lng = longitudeOrRoundAmount;
		precision = roundAmount;
	} else if (Array.isArray(coordinates)) {
		// Handle array format: [lat, lng]
		[lat, lng] = coordinates;
	} else if (typeof coordinates === 'object') {
		if ('position' in coordinates) {
			// Handle Google Maps format: { position: { lat, lng } }
			lat = coordinates.position.lat;
			lng = coordinates.position.lng;
		} else {
			// Handle object format with various property names
			lat = coordinates?.latitude ?? (coordinates?.lat || 0);
			lng = coordinates?.longitude ?? (coordinates?.lng || 0);
		}
	} else {
		throw new Error('Invalid coordinates format');
	}

	// Validate coordinates
	if (typeof lat !== 'number' || typeof lng !== 'number') {
		throw new Error('Invalid coordinates: latitude and longitude must be numbers');
	}

	return {
		latitude: Math.round(lat * precision) / precision,
		longitude: Math.round(lng * precision) / precision,
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
		// Dynamically import @capacitor/geolocation
		const { Geolocation } = await import('@capacitor/geolocation');
		return !!Geolocation;
	} catch {
		return false;
	}
}

// endregion: Helpers
