import * as Event from '../Event';
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
 * Get the user's geolocation
 *
 * @returns Promise<GeolocationPosition>
 * @throws GeolocationPositionError
 */
export function getLocation(): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject('Geolocation is not supported by this browser.');
		} else {
			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					Event.Bus.dispatch('location:change', position);
					resolve(position);
				},
				(error: GeolocationPositionError) => {
					Event.Bus.dispatch('location:error', error);
					reject(error);
				},
			);
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
	options: PositionOptions = { enableHighAccuracy: true },
): number {
	if (!navigator.geolocation) {
		return 0;
	}

	return navigator.geolocation.watchPosition(
		(position: GeolocationPosition) => {
			Event.Bus.dispatch('location:change', position);
			callback && callback(position);
		},
		(error: GeolocationPositionError) => {
			Event.Bus.dispatch('location:error', error);
			errorCallback && errorCallback(error);
		},
		options,
	);
}

/**
 * Ask the user for permission to get their geolocation
 *
 * @returns Promise<PermissionStatus>
 */
export function askPermission(): Promise<PermissionStatus> {
	return new Promise((resolve, reject) => {
		if (!navigator.permissions) {
			reject('Geolocation is not supported by this browser.');
		} else {
			navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
				resolve(permissionStatus);
			});
		}
	});
}

/**
 * Clear the watch
 *
 * @param number watchId
 * @returns void
 */
export function clearWatch(watchId: number): void {
	if (!navigator.geolocation) {
		return;
	}

	navigator.geolocation.clearWatch(watchId);
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
