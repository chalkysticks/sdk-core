/**
 * @class EventDispatcher
 * @package Common
 * @project ChalkySticks SDK Core
 */
export default class EventDispatcher {
    /**
     * @return EventDispatcher
     */
    static get global() {
        return this.getInstance();
    }
    /**
     * @type EventDispatcher
     */
    static instance;
    /**
     * @return EventDispatcher
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventDispatcher();
        }
        return this.instance;
    }
    /**
     * @return boolean
     */
    get shouldUseWindow() {
        return this.useWindow && typeof window !== 'undefined';
    }
    /**
     * List of events currently attached
     *
     * @type object
     */
    events = {};
    /**
     * @type boolean
     */
    useWindow = true;
    /**
     * Listen for an event
     *
     * @param string event
     * @param function listener
     * @return self
     */
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
    /**
     * Unlisten an event
     *
     * @param string event
     * @param function listener
     * @return EventDispatcher
     */
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
    /**
     * Trigger an event call
     *
     * @param string event
     * @param object options
     * @return EventDispatcher
     */
    dispatch(event, detail = {}) {
        // Check if we have a DOM/Window
        if (this.shouldUseWindow) {
            window?.dispatchEvent(new CustomEvent(event, { detail }));
        }
        // Trigger internally
        else if (this.events[event]) {
            this.events[event].forEach((listener) => listener(detail));
        }
        return this;
    }
    /**
     * Dispatches an event on the next frame
     *
     * @param string event
     * @param object options
     * @return EventDispatcher
     */
    deferDispatch(event, detail = {}, amount = 1) {
        setTimeout(() => this.dispatch(event, detail), amount);
        return this;
    }
}
