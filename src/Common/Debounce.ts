/**
 * Debounce (Inclusive)
 *
 * Prevents a function from being fired too often by determining
 * a difference in time from the last time in which it was fired.
 *
 * Applies inclusive techniques to execute functions one last time.
 *
 * @author Matt Kenefick <polymermallard.com>
 * @see https://medium.com/@mattkenefick/debouncing-in-typescript-d5edddf39cdc
 */
export default class Debounce {
	/**
	 * Statically call a debounced method and infer its categorization
	 *
	 * @return void
	 */
	public static exec(
		reference: symbol | string,
		callable: () => void,
		args: any[] = [],
		timeout: number = 1000,
	): void {
		if (!this.instances[reference]) {
			const instance = new Debounce(callable, timeout);
			this.instances[reference] = instance.run;
		}

		this.instances[reference](...args);
	}

	/**
	 * Static references to debouncers generated by the `exec` call
	 *
	 * @type [symbol, any]
	 */
	private static instances: any = {};

	/**
	 * Debounced function
	 *
	 * @type function
	 */
	public callback: () => void;

	/**
	 * Time in between triggers
	 *
	 * @type number
	 */
	public threshold: number;

	/**
	 * Last time this function was triggered
	 *
	 * @type number
	 */
	private lastTrigger: number = 0;

	/**
	 * Timeout for calling future events
	 *
	 * @type number
	 */
	private timeout: number = 0;

	/**
	 * @param function callback
	 * @param number threshold
	 * @return function
	 */
	public constructor(callback: () => void, threshold: number = 200) {
		this.callback = callback;
		this.threshold = threshold;

		// Don't execute on first pass; only after threshold waits
		// Disable this if you want immediate execution as well as inclusive
		this.lastTrigger = Date.now();

		this.run = this.run.bind(this);
	}

	/**
	 * Executable function
	 *
	 * @return void
	 */
	public run(): void {
		const now: number = Date.now();
		const diff: number = now - this.lastTrigger;

		// Execute Immediately
		if (diff > this.threshold) {
			this.lastTrigger = now;
			this.callback();
		}

		// Cancel future event, if exists
		if (this.timeout !== 0) {
			clearTimeout(this.timeout);
			this.timeout = 0;
		}

		// Create future event
		this.timeout = window.setTimeout(this.callback, this.threshold);
	}
}