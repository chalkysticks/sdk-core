export declare class Debounce {
    static exec(reference: symbol | string, callable: () => void, timeout?: number, inclusive?: boolean, args?: any[]): void;
    private static instances;
    callback: () => void;
    threshold: number;
    private inclusive;
    private lastTrigger;
    private timeout;
    constructor(callback: () => void, threshold?: number, immediate?: boolean, inclusive?: boolean);
    run(wasInclusive?: boolean): void;
}
