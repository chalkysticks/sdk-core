import * as Event from '../Event/index.js';
import * as Exception from '../Exception/index.js';
import { Cache } from './Cache.js';
import { toRadians, toDegrees, EARTH_RADIUS } from './Math.js';
export const config = {
    IP_LOCATION_API: 'https://ipapi.co/json/',
};
export const CACHE_EXPIRATION = 1000 * 6 * 2;
export const cache = new Cache(CACHE_EXPIRATION);
export async function getLocation() {
    const cacheKey = 'geolocation';
    const cachedLocation = cache.get(cacheKey);
    if (cachedLocation) {
        return cachedLocation;
    }
    try {
        if (navigator?.geolocation) {
            return await getBrowserLocation(cacheKey);
        }
        else if (await isCapacitorGeolocationAvailable()) {
            return await getCapacitorLocation(cacheKey);
        }
        else {
            return await getIPLocationFallback(cacheKey);
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Exception.Geolocation('Unknown error occurred');
    }
}
export function watchLocation(callback, errorCallback, options = { enableHighAccuracy: true }) {
    const cacheKey = 'geolocation';
    if (navigator?.geolocation) {
        return navigator.geolocation.watchPosition((position) => {
            const payload = formPayload(position);
            cache.set(cacheKey, payload, CACHE_EXPIRATION);
            Event.Bus.dispatch('location:change', payload);
            callback?.(payload);
        }, async (error) => {
            try {
                const ipPosition = await getIPLocation();
                const payload = formPayload(ipPosition);
                cache.set(cacheKey, payload, CACHE_EXPIRATION);
                Event.Bus.dispatch('location:change', payload);
                callback?.(payload);
            }
            catch (ipError) {
                Event.Bus.dispatch('location:error', error);
                errorCallback?.(error);
            }
        }, options);
    }
    return 0;
}
export function clearWatch(watchId) {
    try {
        if (!navigator?.geolocation) {
            throw new Exception.Geolocation('Geolocation is not supported by this browser.');
        }
        navigator.geolocation.clearWatch(watchId);
    }
    catch (error) {
        console.error('Error clearing geolocation watch:', error);
    }
}
async function getBrowserLocation(cacheKey) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const payload = formPayload(position);
            cache.set(cacheKey, payload, CACHE_EXPIRATION);
            console.info('🔸 Location', payload);
            Event.Bus.dispatch('location:change', payload);
            resolve(payload);
        }, async (error) => {
            console.warn('Browser geolocation error:', error);
            if (error.code === error.PERMISSION_DENIED) {
                reject(new Exception.Geolocation('Permission denied for geolocation.'));
            }
            else if (error.code === error.POSITION_UNAVAILABLE) {
                reject(new Exception.Geolocation('Geolocation position unavailable.'));
            }
            else if (error.code === error.TIMEOUT) {
                reject(new Exception.Geolocation('Geolocation request timed out.'));
            }
            else {
                try {
                    const position = await getIPLocation();
                    const payload = formPayload(position);
                    cache.set(cacheKey, payload, CACHE_EXPIRATION);
                    console.info('🔺 Location', payload);
                    Event.Bus.dispatch('location:change', payload);
                    resolve(payload);
                }
                catch (ipError) {
                    reject(new Exception.Geolocation('Fallback IP location failed.'));
                }
            }
        });
    });
}
async function getCapacitorLocation(cacheKey) {
    try {
        const { Geolocation } = await import('@capacitor/geolocation');
        const position = await Geolocation.getCurrentPosition();
        const payload = formPayload(position);
        cache.set(cacheKey, payload, CACHE_EXPIRATION);
        console.info('🔹 Location', payload);
        Event.Bus.dispatch('location:change', payload);
        return payload;
    }
    catch (error) {
        try {
            const position = await getIPLocation();
            const payload = formPayload(position);
            cache.set(cacheKey, payload, CACHE_EXPIRATION);
            console.info('🔺 Location', payload);
            Event.Bus.dispatch('location:change', payload);
            return payload;
        }
        catch (ipError) {
            Event.Bus.dispatch('location:error', error);
            throw error;
        }
    }
}
async function getIPLocationFallback(cacheKey) {
    try {
        const ipPosition = await getIPLocation();
        const payload = formPayload(ipPosition);
        cache.set(cacheKey, payload, CACHE_EXPIRATION);
        console.info('🔺 Location', payload);
        Event.Bus.dispatch('location:change', payload);
        return payload;
    }
    catch (error) {
        Event.Bus.dispatch('location:error', error);
        throw new Exception.Geolocation('Failed to get IP location');
    }
}
async function getIPLocation() {
    const response = await fetch(config.IP_LOCATION_API);
    const data = await response.json();
    return {
        coords: {
            accuracy: 5000,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: data.latitude,
            longitude: data.longitude,
            speed: null,
        },
        timestamp: Date.now(),
    };
}
function formPayload(position) {
    return {
        position: position,
        timestamp: Date.now(),
    };
}
export function distanceBetween(latitude1, longitude1, latitude2, longitude2) {
    const R = EARTH_RADIUS;
    const dLatitude = toRadians(latitude2 - latitude1);
    const dLongitude = toRadians(longitude2 - longitude1);
    const a = Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
        Math.cos(toRadians(latitude1)) * Math.cos(toRadians(latitude2)) * Math.sin(dLongitude / 2) * Math.sin(dLongitude / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}
export function getBearing(latitude1, longitude1, latitude2, longitude2) {
    const dLongitude = toRadians(longitude2 - longitude1);
    const y = Math.sin(dLongitude) * Math.cos(toRadians(latitude2));
    const x = Math.cos(toRadians(latitude1)) * Math.sin(toRadians(latitude2)) -
        Math.sin(toRadians(latitude1)) * Math.cos(toRadians(latitude2)) * Math.cos(dLongitude);
    const brng = toDegrees(Math.atan2(y, x));
    return (brng + 360) % 360;
}
export function getBounds(latitude, longitude, radius) {
    const R = EARTH_RADIUS;
    const latitude1 = toRadians(latitude);
    const longitude1 = toRadians(longitude);
    const d = radius / R;
    const bounds = {
        latitudeMin: toDegrees(latitude1 - d),
        latitudeMax: toDegrees(latitude1 + d),
        longitudeMin: toDegrees(longitude1 - d / Math.cos(latitude1)),
        longitudeMax: toDegrees(longitude1 + d / Math.cos(latitude1)),
    };
    return bounds;
}
export function isPointInBounds(latitude, longitude, bounds) {
    return latitude >= bounds.latitudeMin && latitude <= bounds.latitudeMax && longitude >= bounds.longitudeMin && longitude <= bounds.longitudeMax;
}
export function simplifyCoordinates(coordinates, longitudeOrRoundAmount, roundAmount = 1e3) {
    let lat;
    let lng;
    let precision = roundAmount;
    if (typeof coordinates === 'number' && typeof longitudeOrRoundAmount === 'number') {
        lat = coordinates;
        lng = longitudeOrRoundAmount;
        precision = roundAmount;
    }
    else if (Array.isArray(coordinates)) {
        [lat, lng] = coordinates;
    }
    else if (typeof coordinates === 'object') {
        if ('position' in coordinates) {
            lat = coordinates.position.lat;
            lng = coordinates.position.lng;
        }
        else {
            lat = coordinates?.latitude ?? (coordinates?.lat || 0);
            lng = coordinates?.longitude ?? (coordinates?.lng || 0);
        }
    }
    else {
        throw new Error('Invalid coordinates format');
    }
    if (typeof lat !== 'number' || typeof lng !== 'number') {
        throw new Error('Invalid coordinates: latitude and longitude must be numbers');
    }
    return {
        latitude: Math.round(lat * precision) / precision,
        longitude: Math.round(lng * precision) / precision,
    };
}
async function isCapacitorGeolocationAvailable() {
    try {
        const { Geolocation } = await import('@capacitor/geolocation');
        return !!Geolocation;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9HZW9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxTQUFTLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUEwQy9ELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRztJQUNyQixlQUFlLEVBQUUsd0JBQXdCO0NBQ3pDLENBQUM7QUFPRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQU83QyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQU9qRCxNQUFNLENBQUMsS0FBSyxVQUFVLFdBQVc7SUFDaEMsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDO0lBQy9CLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFM0MsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNwQixPQUFPLGNBQWMsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxDQUFDO1FBQ0osSUFBSSxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUM7WUFDNUIsT0FBTyxNQUFNLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7YUFBTSxJQUFJLE1BQU0sK0JBQStCLEVBQUUsRUFBRSxDQUFDO1lBQ3BELE9BQU8sTUFBTSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxDQUFDO2FBQU0sQ0FBQztZQUNQLE9BQU8sTUFBTSxxQkFBcUIsQ0FB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