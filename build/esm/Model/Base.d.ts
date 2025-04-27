import { IAttributes, Model } from 'restmc';
type ReactiveHook = (instance: any) => void;
export declare class Base extends Model {
    static useReactiveHook(hook: ReactiveHook): void;
    private static _reactiveHook?;
    baseUrl: string;
    constructor(attributes?: IAttributes, options?: IAttributes);
    attachEvents(): void;
    detachEvents(): void;
    getBaseUrl(): string;
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
}
export {};
