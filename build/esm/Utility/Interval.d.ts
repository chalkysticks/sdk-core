export interface IInterval {
    fps: number;
    func: (e: any) => any;
    lastTick?: number;
    name?: string;
}
export declare class Interval {
    static instance: Interval;
    static add(func: (e: any) => any, fps?: number, name?: string): string;
    static fps(name: string, fps: number, func: (e: any) => any): Interval;
    static list(): void;
    static remove(name: string): void;
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
