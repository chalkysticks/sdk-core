import * as Event from '../Event/index.js';
import * as Exception from '../Exception/index.js';
import { Cache } from './Cache.js';
import { toRadians, toDegrees, EARTH_RADIUS } from './Math.js';
export const config = {
    IP_LOCATION_API: 'https://ipapi.co/json/',
};
export const CACHE_EXPIRATION = 1000 * 6 * 2;
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
export const IP_LOCATION_ENDPOINT = 'https://ipapi.co/json/';
export const CACHE_EXPIRATION_MS = 1000 * 60 * 2;
export const cache = new Cache(CACHE_EXPIRATION);
const subscribers = [];
let latestPayload = null;
let nativeWatchId = null;
export async function getLocation() {
    if (latestPayload)
        return latestPayload;
    const cached = cache.get('geolocation');
    if (cached) {
        latestPayload = cached;
        console.log('🔸 Cached location', cached);
        return cached;
    }
    return await obtainFreshLocation();
}
export function watchLocation(callback) {
    const subscriber = { callback };
    subscribers.push(subscriber);
    if (latestPayload) {
        callback(latestPayload);
    }
    if (nativeWatchId === null) {
        nativeWatchId = createNativeWatch();
    }
    return () => {
        const index = subscribers.indexOf(subscriber);
        if (index !== -1)
            subscribers.splice(index, 1);
        if (subscribers.length === 0 && nativeWatchId !== null && navigator?.geolocation) {
            navigator.geolocation.clearWatch(nativeWatchId);
            nativeWatchId = null;
        }
    };
}
export function clearWatch() {
    subscribers.splice(0);
    if (nativeWatchId !== null && navigator?.geolocation) {
        navigator.geolocation.clearWatch(nativeWatchId);
        nativeWatchId = null;
    }
}
function createNativeWatch() {
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
function handleNativeSuccess(position) {
    const payload = {
        position: position,
        timestamp: Date.now(),
    };
    if (isSamePosition(payload))
        return;
    cacheAndDispatch(payload);
}
async function handleNativeError(error) {
    if (latestPayload && !latestPayload.stale) {
        console.info('⚠️  Ignoring late geolocation error:', error.message);
        return;
    }
    await rolloverToIpFallback();
}
async function rolloverToIpFallback() {
    try {
        const position = await getIpLocation();
        const payload = {
            position: position,
            stale: true,
            timestamp: Date.now(),
        };
        cacheAndDispatch(payload);
    }
    catch (error) {
        console.error('❌ Failed IP fallback:', error);
        Event.Bus.dispatch('location:error', error);
    }
}
async function getIpLocation() {
    const response = await fetch(IP_LOCATION_ENDPOINT);
    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
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
    };
}
async function obtainFreshLocation() {
    try {
        if (navigator?.geolocation) {
            const position = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, {
                enableHighAccuracy: true,
                timeout: 10000,
            }));
            const payload = {
                position: position,
                timestamp: Date.now(),
            };
            cacheAndDispatch(payload);
            return payload;
        }
        throw new Error('Navigator API unavailable');
    }
    catch {
        if (await isCapacitorGeolocationAvailable()) {
            try {
                const { Geolocation } = await import('@capacitor/geolocation');
                const position = (await Geolocation.getCurrentPosition());
                const payload = {
                    position: position,
                    timestamp: Date.now(),
                };
                cacheAndDispatch(payload);
                return payload;
            }
            catch {
            }
        }
        await rolloverToIpFallback();
        if (latestPayload)
            return latestPayload;
        throw new Exception.Geolocation('All location methods failed.');
    }
}
function cacheAndDispatch(payload) {
    latestPayload = payload;
    cache.set('geolocation', payload, CACHE_EXPIRATION_MS);
    Event.Bus.dispatch('location:change', payload);
    subscribers.forEach(({ callback }) => callback(payload));
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
function isSamePosition(next) {
    if (!latestPayload)
        return false;
    return (latestPayload.position.coords.latitude === next.position.coords.latitude &&
        latestPayload.position.coords.longitude === next.position.coords.longitude &&
        (latestPayload.stale ?? false) === (next.stale ?? false));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9HZW9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sS0FBSyxTQUFTLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFpRC9ELE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRztJQUNyQixlQUFlLEVBQUUsd0JBQXdCO0NBQ3pDLENBQUM7QUFPRixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQVc3QyxNQUFNLENBQUMsS0FBSyxVQUFVLGVBQWU7SUFFcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUM7WUFDSixNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BJLE9BQU8sU0FBUyxDQUFDO1FBQ2xCLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUixPQUFPLFFBQVEsQ0FBQztRQUNqQixDQUFDO0lBQ0YsQ0FBQztJQUdELE1BQU0sTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUcxRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDO1lBQ0osTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwSSxPQUFPLFNBQVMsQ0FBQztRQUNsQixDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1IsT0FBTyxRQUFRLENBQUM7UUFDakIsQ0FBQztJQUNGLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDckIsQ0FBQztBQU9ELE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLHdCQUF3QixDQUFDO0FBQzdELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWpELE1BQU0sV0FBVyxHQUFrQixFQUFFLENBQUM7QUFDdEMsSUFBSSxhQUFhLEdBQStCLElBQUksQ0FBQztBQUNyRCxJQUFJLGFBQWEsR0FBa0IsSUFBSSxDQUFDO0FBT3hDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsV0FBVztJQUNoQyxJQUFJLGFBQWE7UUFBRSxPQUFPLGFBQWEsQ0FBQztJQUd4QyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXhDLElBQUksTUFBTSxFQUFFLENBQUM7UUFDWixhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsT0FBTyxNQUFNLENBQUM7SUFDZixDQUFDO0lBR0QsT0FBTyxNQUFNLG1CQUFtQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQVNELE1BQU0sVUFBVSxhQUFhLENBQUMsUUFBOEI7SUFDM0QsTUFBTSxVQUFVLEdBQWdCLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDN0MsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUc3QixJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQ25CLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBR0QsSUFBSSxhQUFhLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDNUIsYUFBYSxHQUFHLGlCQUFpQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUdELE9BQU8sR0FBUyxFQUFFO1FBQ2pCLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFHL0MsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxhQUFhLEtBQUssSUFBSSxJQUFJLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUNsRixTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNoRCxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7SUFDRixDQUFDLENBQUM7QUFDSCxDQUFDO0FBT0QsTUFBTSxVQUFVLFVBQVU7SUFDekIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV0QixJQUFJLGFBQWEsS0FBSyxJQUFJLElBQUksU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3RELFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztBQUNGLENBQUM7QUFRRCxTQUFTLGlCQUFpQjtJQUN6QixJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUN6RSxvQkFBb0IsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUU7UUFDbEYsa0JBQWtCLEVBQUUsSUFBSTtRQUN4QixVQUFVLEVBQUUsQ0FBQztRQUNiLE9BQU8sRUFBRSxLQUFLO0tBQ2QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVNELFNBQVMsbUJBQW1CLENBQUMsUUFBNkI7SUFDekQsTUFBTSxPQUFPLEdBQXdCO1FBQ3BDLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3JCLENBQUM7SUFHRixJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUM7UUFBRSxPQUFPO0lBRXBDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFTRCxLQUFLLFVBQVUsaUJBQWlCLENBQUMsS0FBK0I7SUFDL0QsSUFBSSxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsT0FBTztJQUNSLENBQUM7SUFFRCxNQUFNLG9CQUFvQixFQUFFLENBQUM7QUFDOUIsQ0FBQztBQU9ELEtBQUssVUFBVSxvQkFBb0I7SUFDbEMsSUFBSSxDQUFDO1FBQ0osTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztRQUN2QyxNQUFNLE9BQU8sR0FBd0I7WUFDcEMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsS0FBSyxFQUFFLElBQUk7WUFDWCxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtTQUNyQixDQUFDO1FBQ0YsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0FBQ0YsQ0FBQztBQU9ELEtBQUssVUFBVSxhQUFhO0lBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBRTdELE1BQU0sSUFBSSxHQUFrQixNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVsRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBRXBDLE9BQU87UUFDTixNQUFNLEVBQUU7WUFDUCxRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsS0FBSyxFQUFFLElBQUk7U0FDWDtRQUNELFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ0UsQ0FBQztBQUMxQixDQUFDO0FBT0QsS0FBSyxVQUFVLG1CQUFtQjtJQUNqQyxJQUFJLENBQUM7UUFDSixJQUFJLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUM1QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFzQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUNwRSxTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ2xELGtCQUFrQixFQUFFLElBQUk7Z0JBQ3hCLE9BQU8sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUNGLENBQUM7WUFFRixNQUFNLE9BQU8sR0FBRztnQkFDZixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7YUFDckIsQ0FBQztZQUVGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTFCLE9BQU8sT0FBTyxDQUFDO1FBQ2hCLENBQUM7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUVSLElBQUksTUFBTSwrQkFBK0IsRUFBRSxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDO2dCQUNKLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQXdCLENBQUM7Z0JBQ2pGLE1BQU0sT0FBTyxHQUFHO29CQUNmLFFBQVEsRUFBRSxRQUFRO29CQUNsQixTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtpQkFDckIsQ0FBQztnQkFFRixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFMUIsT0FBTyxPQUFPLENBQUM7WUFDaEIsQ0FBQztZQUFDLE1BQU0sQ0FBQztZQUVULENBQUM7UUFDRixDQUFDO1FBR0QsTUFBTSxvQkFBb0IsRUFBRSxDQUFDO1FBRTdCLElBQUksYUFBYTtZQUFFLE9BQU8sYUFBYSxDQUFDO1FBQ3hDLE1BQU0sSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDakUsQ0FBQztBQUNGLENBQUM7QUFRRCxTQUFTLGdCQUFnQixDQUFDLE9BQTRCO0lBQ3JELGFBQWEsR0FBRyxPQUFPLENBQUM7SUFDeEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFFdkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFPRCxTQUFTLFdBQVcsQ0FBQyxRQUE2QjtJQUNqRCxPQUFPO1FBQ04sUUFBUSxFQUFFLFFBQVE7UUFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7S0FDckIsQ0FBQztBQUNILENBQUM7QUFjRCxNQUFNLFVBQVUsZUFBZSxDQUFDLFNBQWlCLEVBQUUsVUFBa0IsRUFBRSxTQUFpQixFQUFFLFVBQWtCO0lBQzNHLE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUN2QixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDLEdBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2SCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQixPQUFPLENBQUMsQ0FBQztBQUNWLENBQUM7QUFXRCxNQUFNLFVBQVUsVUFBVSxDQUFDLFNBQWlCLEVBQUUsVUFBa0IsRUFBRSxTQUFpQixFQUFFLFVBQWtCO0lBQ3RHLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUM7SUFDdEQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxHQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEYsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekMsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDM0IsQ0FBQztBQVVELE1BQU0sVUFBVSxTQUFTLENBQUMsUUFBZ0IsRUFBRSxTQUFpQixFQUFFLE1BQWM7SUFDNUUsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDO0lBQ3ZCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNyQixNQUFNLE1BQU0sR0FBRztRQUNkLFdBQVcsRUFBRSxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyQyxXQUFXLEVBQUUsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDckMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsWUFBWSxFQUFFLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDN0QsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQztBQVVELE1BQU0sVUFBVSxlQUFlLENBQUMsUUFBZ0IsRUFBRSxTQUFpQixFQUFFLE1BQXlCO0lBQzdGLE9BQU8sUUFBUSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUksU0FBUyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDakosQ0FBQztBQVFELFNBQVMsY0FBYyxDQUFDLElBQXlCO0lBQ2hELElBQUksQ0FBQyxhQUFhO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFakMsT0FBTyxDQUNOLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1FBQ3hFLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTO1FBQzFFLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLENBQ3hELENBQUM7QUFDSCxDQUFDO0FBNEJELE1BQU0sVUFBVSxtQkFBbUIsQ0FDbEMsV0FBcUMsRUFDckMsc0JBQStCLEVBQy9CLGNBQXNCLEdBQUc7SUFFekIsSUFBSSxRQUE0QixDQUFDO0lBQ2pDLElBQUksU0FBNkIsQ0FBQztJQUNsQyxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUM7SUFHNUIsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLElBQUksT0FBTyxzQkFBc0IsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUNuRixRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztRQUNuQyxTQUFTLEdBQUcsV0FBVyxDQUFDO0lBQ3pCLENBQUM7U0FHSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUM7SUFDckMsQ0FBQztTQUdJLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNsRSxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFXLEVBQXNCLEVBQUU7WUFDbEUsTUFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVO2dCQUFFLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDaEQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzVDLE9BQU8sU0FBUyxDQUFDO1FBQ2xCLENBQUMsQ0FBQztRQUVGLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUd6QixJQUFJLFVBQVUsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUMvQixNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUMvQixDQUFDO1FBRUQsUUFBUSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUM7UUFDeEYsU0FBUyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDM0YsQ0FBQztJQUdELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDMUcsT0FBTyxDQUFDLElBQUksQ0FBQyxtRUFBbUUsRUFBRTtZQUNqRixXQUFXO1lBQ1gsc0JBQXNCO1lBQ3RCLFdBQVc7U0FDWCxDQUFDLENBQUM7UUFDSCxPQUFPO1lBQ04sUUFBUSxFQUFFLENBQUM7WUFDWCxTQUFTLEVBQUUsQ0FBQztTQUNaLENBQUM7SUFDSCxDQUFDO0lBR0QsT0FBTztRQUNOLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxTQUFTO1FBQ3RELFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxTQUFTO0tBQ3hELENBQUM7QUFDSCxDQUFDO0FBZ0JELEtBQUssVUFBVSwrQkFBK0I7SUFDN0MsSUFBSSxDQUFDO1FBQ0osTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3RCLENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUixPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7QUFDRixDQUFDIn0=