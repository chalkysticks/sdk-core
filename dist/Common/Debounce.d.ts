export default class Debounce {
    static exec(reference: symbol | string, callable: () => void, args?: any[], timeout?: number): void;
    private static instances;
    callback: () => void;
    threshold: number;
    private lastTrigger;
    private timeout;
    constructor(callback: () => void, threshold?: number);
    run(): void;
}
