interface ICachedItem {
    immutable: boolean;
    time: number;
    ttl: number;
    value: any;
}
export declare class Cache {
    private storage;
    private ttl;
    constructor(ttl?: number);
    all(): Record<string, ICachedItem>;
    delete(key: string): void;
    get(key: string): any;
    exists(key: string): boolean;
    has(key: string): boolean;
    set(key: string, value: any, ttl?: number, immutable?: boolean): boolean;
    private isCachedItemHealthy;
    private isImmutable;
}
export {};
