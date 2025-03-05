import { Collection, Model } from 'restmc';
export declare class Base<T extends Model> extends Collection<T> {
    model: any;
    baseUrl: string;
    limit: number;
    constructor(options?: any);
    attachEvents(): void;
    detachEvents(): void;
    shouldFetch(): boolean;
    getBaseUrl(): string;
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
}
