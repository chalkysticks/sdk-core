import { Base } from './Base';
export declare class Geocode extends Base {
    static search(address: string): Promise<Geocode>;
    endpoint: string;
    fields: string[];
    getCityAndState(): string;
    getCountry(): string;
    getFullAddress(): string;
    getLocation(): IGeoLocation;
    getResults(): any;
    getShortAddress(): string;
    getStatus(): string;
    hasResults(): boolean;
    isOK(): boolean;
    private getAddressComponents;
}
