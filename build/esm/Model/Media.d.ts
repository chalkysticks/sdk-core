import { Base } from './Base';
export declare class Media extends Base {
    endpoint: string;
    fields: string[];
    getType(): string;
    getUrl(): string;
}
