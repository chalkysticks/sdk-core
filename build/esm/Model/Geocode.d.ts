import { Base } from './Base.js';
interface IGeoLocation {
    latitude: number;
    longitude: number;
}
export declare class Geocode extends Base {
    static search(address: string): Promise<Geocode>;
    static searchByCoordinates(latitude: number, longitude: number): Promise<Geocode>;
    endpoint: string;
    fields: string[];
    getCity(useShortName?: boolean): string;
    getState(useShortName?: boolean): string;
    getStateShortCode(): string;
    getCityAndState(useShortStateCode?: boolean): string;
    getZipCode(): string;
    getStreetNumber(): string;
    getStreetName(): string;
    getStreetAddress(): string;
    getNeighborhood(): string;
    getCounty(): string;
    getCountry(useShortCode?: boolean): string;
    getCountryCode(): string;
    getFullAddress(): string;
    getShortAddress(): string;
    getAddressComponentByType(type: string, useShortName?: boolean): string;
    getLocation(): IGeoLocation;
    getLatitude(): number;
    getLongitude(): number;
    getCoordinatesString(precision?: number): string;
    getLocationType(): string;
    getViewport(): {
        northeast: IGeoLocation;
        southwest: IGeoLocation;
    } | null;
    getFormattedAddress(): string;
    getPlaceId(): string;
    getResults(): any[];
    getStatus(): string;
    getErrorMessage(): string;
    hasResults(): boolean;
    isOK(): boolean;
    isInCountry(countryCode: string): boolean;
    isInState(stateCode: string): boolean;
    private getAddressComponents;
}
export {};
