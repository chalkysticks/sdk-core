import { Base } from './Base';
export declare class User extends Base {
    endpoint: string;
    fields: string[];
    getEmail(): string;
    getLatitude(): number;
    getLongitude(): number;
    getName(): string;
    getPermissions(): number;
    getPhone(): string;
    getSlug(): string;
    getStatus(): number;
}
