import { Base } from './Base.js';
export declare class Advertisement extends Base {
    endpoint: string;
    fields: string[];
    getCaption(): string;
    getCompany(): string;
    getImage(): string;
    getUrl(): string;
}
