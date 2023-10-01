import { Collection, Model } from 'restmc';
export declare class Base<T extends Model> extends Collection<T> {
    model: any;
    baseUrl: string;
    limit: number;
    constructor(options?: any);
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
}
