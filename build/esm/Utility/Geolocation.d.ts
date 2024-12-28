import { Cache } from './Cache.js';
export interface IGeolocationPayload {
    hasOccurred?: boolean;
    position: GeolocationPosition;
    stale?: boolean;
    timestamp: number;
}
export interface IGeolocationCallback {
    (payload: IGeolocationPayload): void;
}
export interface ICoordinateBounds {
    latitudeMin: number;
    latitudeMax: number;
    longitudeMin: number;
    longitudeMax: number;
}
export interface IPAPIResponse {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
}
export declare const config: {
    IP_LOCATION_API: string;
};
export declare const CACHE_EXPIRATION: number;
export declare const cache: Cache;
export declare function getLocation(): Promise<IGeolocationPayload>;
export declare function watchLocation(callback?: IGeolocationCallback, errorCallback?: PositionErrorCallback, options?: PositionOptions): number;
export declare function clearWatch(watchId: number): void;
export declare function distanceBetween(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number;
export declare function getBearing(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number;
export declare function getBounds(latitude: number, longitude: number, radius: number): ICoordinateBounds;
export declare function isPointInBounds(latitude: number, longitude: number, bounds: ICoordinateBounds): boolean;
export declare function simplifyCoordinates(coordinates: CoordinateInput | number, longitudeOrRoundAmount?: number, roundAmount?: number): {
    latitude: number;
    longitude: number;
};
type CoordinateInput = {
    lat?: number;
    latitude?: number;
    lng?: number;
    longitude?: number;
} | [number, number] | {
    position: {
        lat: number;
        lng: number;
    };
} | [latitude: number, longitude: number];
export {};
