export default class EventDispatcher {
    static get global() {
        return this.getInstance();
    }
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventDispatcher();
        }
        return this.instance;
    }
    get shouldUseWindow() {
        return this.useWindow && typeof window !== 'undefined';
    }
    events = {};
    useWindow = true;
    on(event, listener) {
        if (this.shouldUseWindow) {
            window.addEventListener(event, listener);
        }
        else {
            this.events[event] = this.events[event] || [];
            this.events[event].push(listener);
        }
        return this;
    }
    off(event, listener) {
        if (this.shouldUseWindow) {
            window.removeEventListener(event, listener);
        }
        else {
            this.events[event] = this.events[event] || [];
            if (!listener) {
                this.events[event] = [];
            }
            else {
                this.events[event] = this.events[event].filter((handler) => handler != listener);
            }
        }
        return this;
    }
    dispatch(event, detail = {}) {
        if (this.shouldUseWindow) {
            window?.dispatchEvent(new CustomEvent(event, { detail }));
        }
        else if (this.events[event]) {
            this.events[event].forEach((listener) => listener(detail));
        }
        return this;
    }
    deferDispatch(event, detail = {}, amount = 1) {
        setTimeout(() => this.dispatch(event, detail), amount);
        return this;
    }
}
//# sourceMappingURL=EventDispatcher.js.map