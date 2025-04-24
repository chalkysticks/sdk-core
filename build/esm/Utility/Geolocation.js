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
export async function requestLocation() {
    if (!navigator.permissions) {
        try {
            await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(() => resolve(), reject, { timeout: 10000 }));
            return 'granted';
        }
        catch {
            return 'denied';
        }
    }
    const status = await navigator.permissions.query({ name: 'geolocation' });
    if (status.state === 'prompt') {
        try {
            await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(() => resolve(), reject, { timeout: 10000 }));
            return 'granted';
        }
        catch {
            return 'denied';
        }
    }
    return status.state;
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
        const position = (await Geolocation.getCurrentPosition());
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
    let latitude;
    let longitude;
    let precision = roundAmount;
    if (typeof coordinates === 'number' && typeof longitudeOrRoundAmount === 'number') {
        latitude = coordinates;
        longitude = longitudeOrRoundAmount;
        precision = roundAmount;
    }
    else if (Array.isArray(coordinates)) {
        [latitude, longitude] = coordinates;
    }
    else if (typeof coordinates === 'object' && coordinates !== null) {
        const getPropValue = (obj, key) => {
            const value = obj?.[key];
            if (typeof value === 'function')
                return value();
            if (typeof value === 'number')
                return value;
            return undefined;
        };
        let source = coordinates;
        if ('position' in coordinates) {
            source = coordinates.position;
        }
        latitude = getPropValue(source, 'latitude') ?? getPropValue(source, 'lat') ?? undefined;
        longitude = getPropValue(source, 'longitude') ?? getPropValue(source, 'lng') ?? undefined;
    }
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
    return {
        latitude: Math.round(latitude * precision) / precision,
        longitude: Math.round(longitude * precision) / precision,
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