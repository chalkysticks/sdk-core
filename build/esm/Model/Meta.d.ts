import { Base } from './Base.js';
export declare class Meta extends Base {
    fields: string[];
    getGroup(): string;
    getKey(): string;
    getValue(): string;
    getCreatedAt(): string;
    getUpdatedAt(): string;
}
