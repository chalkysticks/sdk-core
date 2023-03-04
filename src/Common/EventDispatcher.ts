/**
 * @class EventDispatcher
 * @package Common
 * @project ChalkySticks SDK Core
 */
export default class EventDispatcher {
	/**
	 * @return EventDispatcher
	 */
	public static get global(): EventDispatcher {
		return this.getInstance();
	}

	/**
	 * @type EventDispatcher
	 */
	private static instance: EventDispatcher;

	/**
	 * @return EventDispatcher
	 */
	public static getInstance(): EventDispatcher {
		if (!this.instance) {
			this.instance = new EventDispatcher();
		}

		return this.instance;
	}

	/**
	 * @return boolean
	 */
	private get shouldUseWindow(): boolean {
		return this.useWindow && typeof window !== 'undefined';
	}

	/**
	 * List of events currently attached
	 *
	 * @type object
	 */
	private events: any = {};

	/**
	 * @type boolean
	 */
	private useWindow: boolean = true;

	/**
	 * Listen for an event
	 *
	 * @param string event
	 * @param function listener
	 * @return self
	 */
	public on(event: string, listener: any): this {
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
	public off(event: string, listener: any): EventDispatcher {
		if (this.shouldUseWindow) {
			window.removeEventListener(event, listener);
		}
		else {
			this.events[event] = this.events[event] || [];

			if (!listener) {
				this.events[event] = [];
			}
			else {
				this.events[event] = this.events[event].filter((handler: any) => handler != listener);
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
	public dispatch(event: string, detail: any = {}): EventDispatcher {
		// Check if we have a DOM/Window
		if (this.shouldUseWindow) {
			window?.dispatchEvent(new CustomEvent(event, { detail }));
		}

		// Trigger internally
		else if (this.events[event]) {
			this.events[event].forEach((listener: any) => listener(detail));
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
	public deferDispatch(event: string, detail: any = {}, amount: number = 1): EventDispatcher {
		setTimeout(() => this.dispatch(event, detail), amount);

		return this;
	}
}
