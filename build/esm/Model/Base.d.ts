import { IAttributes, Model } from 'restmc';
export declare class Base extends Model {
    baseUrl: string;
    constructor(attributes?: IAttributes, options?: IAttributes);
    attachEvents(): void;
    detachEvents(): void;
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
}
