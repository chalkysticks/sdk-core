export interface IInterval {
    executions: number;
    fps: number;
    func: (e: any) => any;
    lastTick?: number;
    name: string | symbol;
    stopAfter?: number;
}
export declare class Interval {
    private static _instance;
    static get instance(): Interval;
    static add(optionsOrFunc: any, fps?: number, name?: string | symbol): string | symbol;
    static fps(name: string | symbol, fps: number, func: (e: any) => any): Interval;
    static list(): void;
    static remove(name: string | symbol): void;
    static start(): void;
    static stop(): void;
    enabled: boolean;
    intervals: IInterval[];
    protected lastFrameTime: number;
    constructor();
    protected pause(): void;
    protected unpause(): void;
    protected Handle_OnRequestAnimationFrame(): Promise<void>;
}
