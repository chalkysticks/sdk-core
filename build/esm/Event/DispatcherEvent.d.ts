export type TDispatcherData = Record<string, any>;
export type TDispatcherCallback<T = any> = (envelope: IDispatcherEvent<T>) => void;
export interface IDispatcherEvent<T = any> {
    data: T;
    event: {
        name: string;
        time: number;
    };
    target: any;
}
export declare class DispatcherEvent<T = any> {
    callbacks: TDispatcherCallback<T>[];
    protected envelope: IDispatcherEvent<T>;
    protected eventName: string;
    constructor(eventName: string, envelope?: IDispatcherEvent<T>);
    clearCallbacks(): void;
    registerCallback(callback: TDispatcherCallback<T>): void;
    unregisterCallback(callback: TDispatcherCallback<T>): void;
    fire(envelope: IDispatcherEvent<T>): void;
}
