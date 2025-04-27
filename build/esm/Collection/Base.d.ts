import { Collection, Model } from 'restmc';
type ReactiveHook = (instance: any) => void;
export declare class Base<T extends Model> extends Collection<T> {
    static useReactiveHook(hook: ReactiveHook): void;
    private static _reactiveHook?;
    model: any;
    baseUrl: string;
    limit: number;
    uniqueKey: string;
    constructor(options?: any);
    attachEvents(): void;
    detachEvents(): void;
    shouldFetch(): boolean;
    getBaseUrl(): string;
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
}
export {};
