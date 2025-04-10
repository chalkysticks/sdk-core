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