import { Base } from './Base.js';
export declare class Fact extends Base {
    endpoint: string;
    fields: string[];
    getContext(): string;
    getFact(): string;
    getSource(): string;
    isValidated(): boolean;
}
