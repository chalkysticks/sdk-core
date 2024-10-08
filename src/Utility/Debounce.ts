const debouncerInstances: any = {};

/**
 * Debounce (Inclusive)
 *
 * Prevents a function from being fired too often by determining
 * a difference in time from the last time in which it was fired.
 *
 * Applies inclusive techniques to execute functions one last time.
 *
 * Example Usage:
 *
 * 	function foo() {
 * 		console.log('foo');
 * 	}
 *
 * 	const debouncedFoo = new Debounce(foo, 1000);
 *
 * 	debouncedFoo.run();
 *
 * 	setInterval(() => {
 * 		debouncedFoo.run();
 * 	}, 1000 / 30);
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package ChalkySticks SDK Core
 */
export class Debounce {
	/**
	 * Statically call a debounced method and infer its categorization
	 *
	 * @return void
	 */
	public static exec(reference: symbol | string, callable: () => void, timeout: number = 1000, inclusive: boolean = false, args: any[] = []): void {
		if (!debouncerInstances[reference]) {
			const debouncer = new Debounce(callable, timeout, true, inclusive);
			debouncerInstances[reference] = debouncer.run;
		}

		debouncerInstances[reference](...args);
	}

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
	 * If we should trigger a future event after run call
	 *
	 * @type boolean
	 */
	private inclusive: boolean = false;

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
	 * @param boolean immediate
	 * @param boolean inclusive
	 * @return function
	 */
	public constructor(callback: () => void, threshold: number = 200, immediate: boolean = false, inclusive: boolean = false) {
		this.callback = callback;
		this.inclusive = inclusive;
		this.threshold = threshold;

		// Don't execute on first pass; only after threshold waits
		// Disable this if you want immediate execution as well as inclusive
		if (!inclusive) {
			this.lastTrigger = Date.now();
		}

		// Bind callback to this class
		this.run = this.run.bind(this);
	}

	/**
	 * Executable function
	 *
	 * @param boolean wasInclusive
	 * @return void
	 */
	public run(wasInclusive: boolean = false): void {
		const now: number = Date.now();
		const diff: number = now - this.lastTrigger;

		// Execute Immediately
		if (diff > this.threshold) {
			this.lastTrigger = now;

			// @ts-ignore
			this.callback.apply(null, arguments);
		}

		// mk: We might want to turn this into an await sleep() then call .run()
		// directly. When making extensions, the setTimeout runs eval to call the
		// function which violates unsafe-eval for Trusted Types.

		// Cancel future event, if exists
		if (this.timeout !== 0) {
			clearTimeout(this.timeout);
			this.timeout = 0;
		}

		// Create future event
		if (this.inclusive && !wasInclusive) {
			// @ts-ignore
			this.timeout = setTimeout(() => this.run(true), this.threshold);
		}
	}
}
