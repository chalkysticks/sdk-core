import { DispatcherEvent, TDispatcherCallback, TDispatcherData } from './DispatcherEvent';
export interface IDispatcher {
    dispatch(eventName: string, data?: TDispatcherData): void;
    on(eventName: string, callback: TDispatcherCallback): void;
    off(eventName: string, callback?: TDispatcherCallback): void;
}
export declare class Dispatcher implements IDispatcher {
    protected events: Record<string, DispatcherEvent>;
    dispatch(eventName: string, data?: TDispatcherData): void;
    on(eventName: string, callback: TDispatcherCallback): void;
    once(eventName: string, callback: TDispatcherCallback): void;
    off(eventName: string, callback?: TDispatcherCallback): void;
    $emit(eventName: string, data?: TDispatcherData): void;
    trigger(eventName: string, data?: TDispatcherData): void;
    $on(eventName: string, callback: TDispatcherCallback): void;
    $off(eventName: string, callback: TDispatcherCallback): void;
}
declare const _default: Dispatcher;
export default _default;
