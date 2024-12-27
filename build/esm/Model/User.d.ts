import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';
export declare class User extends Base {
    endpoint: string;
    fields: string[];
    get avatar(): Model.Media;
    get games(): Collection.Meta;
    get lastCollection(): Model.Wallet;
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
