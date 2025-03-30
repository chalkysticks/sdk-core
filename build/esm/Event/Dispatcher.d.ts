import { DispatcherEvent, TDispatcherCallback, TDispatcherData } from './DispatcherEvent.js';
export interface IDispatcher {
    dispatch(eventName: string, data?: TDispatcherData): void;
    on(eventName: string, callback: TDispatcherCallback): void;
    off(eventName: string, callback?: TDispatcherCallback): void;
}
export declare class Dispatcher implements IDispatcher {
    protected events: Record<string, DispatcherEvent<any>>;
    dispatch<T = any>(eventName: string, data?: T): void;
    on<T = any>(eventName: string, callback: TDispatcherCallback<T>): void;
    once<T = any>(eventName: string, callback: TDispatcherCallback<T>): void;
    off<T = any>(eventName: string, callback?: TDispatcherCallback<T>): void;
    $emit(eventName: string, data?: TDispatcherData): void;
    trigger(eventName: string, data?: TDispatcherData): void;
    $on<T = any>(eventName: string, callback: TDispatcherCallback<T>): void;
    $off<T = any>(eventName: string, callback: TDispatcherCallback<T>): void;
}
declare const _default: Dispatcher;
export default _default;
