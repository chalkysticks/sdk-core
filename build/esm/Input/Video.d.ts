import { Event } from '../index.js';
export interface IVideoSource {
    deviceId: string;
    label: string;
}
export declare class Video extends Event.Dispatcher {
    static getSources(): Promise<IVideoSource[]>;
}
