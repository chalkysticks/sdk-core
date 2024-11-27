import { Cache } from './Cache';
export interface ICoordinateBounds {
    latitudeMin: number;
    latitudeMax: number;
    longitudeMin: number;
    longitudeMax: number;
}
export declare const config: {
    IP_LOCATION_API: string;
};
export declare const CACHE_EXPIRATION: number;
export declare const cache: Cache;
export declare function getLocation(): Promise<GeolocationPosition>;
export declare function watchLocation(callback?: PositionCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): number;
export declare function clearWatch(watchId: number): void;
export declare function distanceBetween(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number;
export declare function getBearing(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number;
export declare function getBounds(latitude: number, longitude: number, radius: number): ICoordinateBounds;
export declare function isPointInBounds(latitude: number, longitude: number, bounds: ICoordinateBounds): boolean;
