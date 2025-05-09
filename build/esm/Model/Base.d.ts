import { IAttributes, Model } from 'restmc';
type ReactiveHook = (instance: any) => void;
export declare class Base extends Model {
    static useReactiveHook(hook: ReactiveHook): void;
    private static _reactiveHook?;
    baseUrl: string;
    constructor(attributes?: IAttributes, options?: IAttributes, autoSetup?: boolean);
    setup(options?: IAttributes): void;
    ensureToken(token?: string): void;
    attachEvents(): void;
    detachEvents(): void;
    getBaseUrl(): string;
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
    getCreatedAt(format?: string): string;
    getCreatedAtDate(): Date | null;
    getCreatedAtTimeAgo(shortUnits?: boolean): string;
    getUpdatedAt(format?: string): string;
    getUpdatedAtDate(): Date | null;
    getUpdatedAtTimeAgo(shortUnits?: boolean): string;
    getDeletedAt(format?: string): string;
    getDeletedAtDate(): Date | null;
    getDeletedAtTimeAgo(shortUnits?: boolean): string;
    isDeleted(): boolean;
    protected Handle_OnLoginSuccess(e: any): Promise<void>;
}
export {};
