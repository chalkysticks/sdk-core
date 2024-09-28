export type TDispatcherData = Record<string, any>;
export type TDispatcherCallback<T = TDispatcherData> = (envelope: IDispatcherEvent<T>) => void;
export interface IDispatcherEvent<T = TDispatcherData> {
    data: T;
    event: {
        name: string;
        time: number;
    };
    target: any;
}
export declare class DispatcherEvent {
    callbacks: TDispatcherCallback[];
    protected envelope: IDispatcherEvent;
    protected eventName: string;
    constructor(eventName: string, envelope?: IDispatcherEvent);
    clearCallbacks(): void;
    registerCallback(callback: TDispatcherCallback): void;
    unregisterCallback(callback: TDispatcherCallback): void;
    fire(envelope: IDispatcherEvent): void;
}
