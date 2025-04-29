import { Event } from '../index.js';
export interface ILatchOptions {
    condition: () => boolean;
    duration?: number;
    name?: string | symbol;
}
export declare class Latch extends Event.Dispatcher {
    private static registry;
    static add(options: ILatchOptions): Latch;
    static wait(options: ILatchOptions): Promise<void>;
    static remove(name?: string | symbol): void;
    static clear(): void;
    private readonly condition;
    private readonly duration;
    private readonly name;
    private intervalName;
    private hasTriggered;
    constructor(options: ILatchOptions);
    start(): void;
    stop(): void;
    private checkCondition;
}
