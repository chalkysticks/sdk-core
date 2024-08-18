import { Event } from '../index.js';
export type TSensorEventNames = 'devicemotion' | 'deviceorientation';
export interface IDeviceMotionEventData {
    acceleration: any;
    accelerationIncludingGravity: any;
    interval: number;
    rotationRate: any;
}
export interface IDeviceOrientationEventData {
    absolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}
export type TSensorEventHandler = (data: IDeviceMotionEventData | IDeviceOrientationEventData) => void;
export declare class Sensor extends Event.Dispatcher {
    static instance: Sensor;
    static start(): void;
    get hasMotion(): boolean;
    get hasOrientation(): boolean;
    get hasSensors(): boolean;
    constructor();
    attachEvents(): void;
    detachEvents(): void;
    protected Handle_OnDeviceMotion(e: IDeviceMotionEventData): Promise<void>;
    protected Handle_OnDeviceOrientation(e: IDeviceOrientationEventData): Promise<void>;
}
