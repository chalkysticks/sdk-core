import * as Event from '../Event';
import * as Exception from '../Exception';
import { toRadians, toDegrees, EARTH_RADIUS } from './Math';
export function getLocation(useWeb = true) {
    return new Promise((resolve, reject) => {
        const handleBrowserLocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                Event.Bus.dispatch('location:change', position);
                resolve(position);
            }, async (error) => {
                if (useWeb) {
                    try {
                        const ipPosition = await getIPLocation();
                        Event.Bus.dispatch('location:change', ipPosition);
                        resolve(ipPosition);
                    }
                    catch (ipError) {
                        Event.Bus.dispatch('location:error', error);
                        reject(error);
                    }
                }
                else {
                    Event.Bus.dispatch('location:error', error);
                    reject(error);
                }
            });
        };
        try {
            if (navigator?.geolocation) {
                handleBrowserLocation();
            }
            else if (useWeb) {
                getIPLocation()
                    .then((position) => {
                    Event.Bus.dispatch('location:change', position);
                    resolve(position);
                })
                    .catch((error) => {
                    Event.Bus.dispatch('location:error', error);
                    reject(new Exception.Geolocation('Failed to get IP location'));
                });
            }
            else {
                throw new Exception.Geolocation('Geolocation is not supported');
            }
        }
        catch (error) {
            reject(error instanceof Error ? error : new Exception.Geolocation('Unknown error occurred'));
        }
    });
}
export function watchLocation(callback, errorCallback, options = { enableHighAccuracy: true, useWeb: true }) {
    const { useWeb = true, ...positionOptions } = options;
    if (navigator?.geolocation) {
        return navigator.geolocation.watchPosition((position) => {
            Event.Bus.dispatch('location:change', position);
            callback?.(position);
        }, async (error) => {
            if (useWeb) {
                try {
                    const ipPosition = await getIPLocation();
                    Event.Bus.dispatch('location:change', ipPosition);
                    callback?.(ipPosition);
                }
                catch (ipError) {
                    Event.Bus.dispatch('location:error', error);
                    errorCallback?.(error);
                }
            }
            else {
                Event.Bus.dispatch('location:error', error);
                errorCallback?.(error);
            }
        }, positionOptions);
    }
    else if (useWeb) {
        const intervalId = setInterval(async () => {
            try {
                const ipPosition = await getIPLocation();
                Event.Bus.dispatch('location:change', ipPosition);
                callback?.(ipPosition);
            }
            catch (error) {
                Event.Bus.dispatch('location:error', error);
                errorCallback?.(error);
            }
        }, 30000);
        return intervalId;
    }
    return 0;
}
async function getIPLocation() {
    const response = await fetch('https://ipapi.co/json/');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9HZW9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLEtBQUssU0FBUyxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUE0QjVELE1BQU0sVUFBVSxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUk7SUFDeEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QyxNQUFNLHFCQUFxQixHQUFHLEdBQUcsRUFBRTtZQUNsQyxTQUFTLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUN2QyxDQUFDLFFBQTZCLEVBQUUsRUFBRTtnQkFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQixDQUFDLEVBQ0QsS0FBSyxFQUFFLEtBQStCLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWixJQUFJLENBQUM7d0JBQ0osTUFBTSxVQUFVLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQzt3QkFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQ2xELE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDckIsQ0FBQztvQkFBQyxPQUFPLE9BQU8sRUFBRSxDQUFDO3dCQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFD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