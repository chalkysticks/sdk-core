export default class Debounce {
    static exec(reference, callable, args = [], timeout = 1000) {
        if (!this.instances[reference]) {
            const instance = new Debounce(callable, timeout);
            this.instances[reference] = instance.run;
        }
        this.instances[reference](...args);
    }
    static instances = {};
    callback;
    threshold;
    lastTrigger = 0;
    timeout = 0;
    constructor(callback, threshold = 200) {
        this.callback = callback;
        this.threshold = threshold;
        this.lastTrigger = Date.now();
        this.run = this.run.bind(this);
    }
    run() {
        const now = Date.now();
        const diff = now - this.lastTrigger;
        if (diff > this.threshold) {
            this.lastTrigger = now;
            this.callback();
        }
        if (this.timeout !== 0) {
            clearTimeout(this.timeout);
            this.timeout = 0;
        }
        this.timeout = window.setTimeout(this.callback, this.threshold);
    }
}
//# sourceMappingURL=Debounce.js.map