import { Event } from '../index.js';
export interface IHysteresisOptions {
    condition: () => boolean;
    threshold?: number;
    duration?: number;
}
export declare class Hysteresis extends Event.Dispatcher {
    static add(options: IHysteresisOptions): Hysteresis;
    static wait(options: IHysteresisOptions): Promise<unknown>;
    private readonly threshold;
    private readonly duration;
    private conditionMetCount;
    private isVariableSet;
    private condition;
    private intervalName;
    constructor(condition: () => boolean, threshold?: number, duration?: number);
    reset(): void;
    start(): void;
    stop(): void;
    protected checkCondition(): void;
}
