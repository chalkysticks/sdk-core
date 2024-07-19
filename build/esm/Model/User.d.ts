import * as Collection from '../Collection';
import { Base } from './Base';
export declare class User extends Base {
    endpoint: string;
    fields: string[];
    get games(): Collection.Meta;
    get media(): Collection.Media;
    get metadata(): Collection.Meta;
    getLatitude(): number;
    getLongitude(): number;
    getName(): string;
    getPermissions(): number;
    getPhone(): string;
    getSlug(): string;
    getStatus(): number;
    getWalletBalance(): number;
}
