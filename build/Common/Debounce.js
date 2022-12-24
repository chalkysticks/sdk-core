"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Debounce {
    static exec(reference, callable, args = [], timeout = 1000) {
        if (!this.instances[reference]) {
            const instance = new Debounce(callable, timeout);
            this.instances[reference] = instance.run;
        }
        this.instances[reference](...args);
    }
    constructor(callback, threshold = 200) {
        this.lastTrigger = 0;
        this.timeout = 0;
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
exports.default = Debounce;
Debounce.instances = {};
//# sourceMappingURL=Debounce.js.map