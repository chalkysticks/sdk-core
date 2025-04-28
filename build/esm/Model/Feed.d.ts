import { Base } from './Base.js';
export declare class Feed extends Base {
    endpoint: string;
    fields: string[];
    getDistance(): number;
    getHtmlMessage(): string;
    getLatitude(): number;
    getLongitude(): number;
    getMessage(asHtml?: boolean): string;
    getType(): number;
}
