export default class EventDispatcher {
    static get global(): EventDispatcher;
    private static instance;
    static getInstance(): EventDispatcher;
    private get shouldUseWindow();
    private events;
    private useWindow;
    on(event: string, listener: any): this;
    off(event: string, listener: any): EventDispatcher;
    dispatch(event: string, detail?: any): EventDispatcher;
    deferDispatch(event: string, detail?: any, amount?: number): EventDispatcher;
}
