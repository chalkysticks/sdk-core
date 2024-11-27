import * as Event from '../Event';
import * as Exception from '../Exception';
import { toRadians, toDegrees, EARTH_RADIUS } from './Math';

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
 * Get location explicitly either through browser events or IP-based fallback
 *
 * @param boolean useWeb
 * @return Promise<GeolocationPosition>
 */
export function getLocation(useWeb = true): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		const handleBrowserLocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					Event.Bus.dispatch('location:change', position);
					resolve(position);
				},
				async (error: GeolocationPositionError) => {
					if (useWeb) {
						try {
							const ipPosition = await getIPLocation();
							Event.Bus.dispatch('location:change', ipPosition);
							resolve(ipPosition);
						} catch (ipError) {
							Event.Bus.dispatch('location:error', error);
							reject(error);
						}
					} else {
						Event.Bus.dispatch('location:error', error);
						reject(error);
					}
				},
			);
		};

		try {
			if (navigator?.geolocation) {
				handleBrowserLocation();
			} else if (useWeb) {
				getIPLocation()
					.then((position) => {
						Event.Bus.dispatch('location:change', position);
						resolve(position);
					})
					.catch((error) => {
						Event.Bus.dispatch('location:error', error);
						reject(new Exception.Geolocation('Failed to get IP location'));
					});
			} else {
				throw new Exception.Geolocation('Geolocation is not supported');
			}
		} catch (error) {
			reject(error instanceof Error ? error : new Exception.Geolocation('Unknown error occurred'));
		}
	});
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
	options: PositionOptions & { useWeb?: boolean } = { enableHighAccuracy: true, useWeb: true },
): number {
	const { useWeb = true, ...positionOptions } = options;

	if (navigator?.geolocation) {
		return navigator.geolocation.watchPosition(
			(position: GeolocationPosition) => {
				Event.Bus.dispatch('location:change', position);
				callback?.(position);
			},
			async (error: GeolocationPositionError) => {
				if (useWeb) {
					try {
						const ipPosition = await getIPLocation();
						Event.Bus.dispatch('location:change', ipPosition);
						callback?.(ipPosition);
					} catch (ipError) {
						Event.Bus.dispatch('location:error', error);
						errorCallback?.(error);
					}
				} else {
					Event.Bus.dispatch('location:error', error);
					errorCallback?.(error);
				}
			},
			positionOptions,
		);
	} else if (useWeb) {
		// Simulate watching with IP (updates every 30 seconds)
		const intervalId = setInterval(async () => {
			try {
				const ipPosition = await getIPLocation();
				Event.Bus.dispatch('location:change', ipPosition);
				callback?.(ipPosition);
			} catch (error) {
				Event.Bus.dispatch('location:error', error);
				errorCallback?.(error as GeolocationPositionError);
			}
		}, 30000);

		return intervalId;
	}

	return 0;
}

/**
 * @return Promise<GeolocationPosition>
 */
async function getIPLocation(): Promise<GeolocationPosition> {
	const response = await fetch('https://ipapi.co/json/');
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
