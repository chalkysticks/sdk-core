/**
 * @type interface
 */
export interface IInterval {
	fps: number;
	func: (e: any) => any;
	lastTick?: number;
	name?: string;
}

/**
 * Interval is a single destination to manage multiple intervals
 * throughout an application.
 *
 * Example Usage:
 *
 * 	import Interval from '@/Utility/Interval';
 *
 * 	Interval.start();
 *
 *
 * Then you can add items as per:
 *
 * 	Interval.add(myMethod, 1000 / 30);
 *
 *
 * @author Matt Kenefick<matt@chalkysticks.com>
 * @package Utility
 * @project ChalkySticks SDK Core
 */
export class Interval {
	// region: Static
	// ---------------------------------------------------------------------------

	/**
	 * @type Interval
	 */
	public static instance: Interval;

	/**
	 * @param Function func
	 * @param number fps
	 * @param string name
	 * @return string
	 */
	public static add(func: (e: any) => any, fps: number = 16, name: string = ''): string {
		name || (name = Math.random().toString(32).substr(2, 6));

		// Create, if not
		if (!this.instance) {
			Interval.start();
		}

		// Add interval
		this.instance.intervals.push({
			fps,
			func,
			name,
		});

		return name;
	}

	/**
	 * @param string name
	 * @param number fps
	 * @param Function func
	 * @return Interval
	 */
	public static fps(name: string, fps: number, func: (e: any) => any): Interval {
		this.instance.intervals.filter((interval: IInterval) => {
			if (interval.name === name) {
				interval.fps = fps || interval.fps;
				interval.func = func || interval.func;
			}
		});

		return this.instance;
	}

	/**
	 * @return void
	 */
	public static list(): void {
		console.log(this.instance.intervals);
	}

	/**
	 * @param string name
	 * @return void
	 */
	public static remove(name: string): void {
		this.instance.intervals = this.instance.intervals.filter((interval: IInterval) => interval.name != name);
	}

	/**
	 * @return void
	 */
	public static start(): void {
		if (!this.instance) {
			this.instance = new Interval();
		}

		this.instance.unpause();
	}

	/**
	 * @return void
	 */
	public static stop(): void {
		if (!this.instance) {
			return;
		}

		this.instance.pause();
	}

	// endregion: Static

	// region: Instance
	// ---------------------------------------------------------------------------

	/**
	 * @type boolean
	 */
	public enabled: boolean = false;

	/**
	 * @type IInterval
	 */
	public intervals: IInterval[] = [];

	/**
	 * @type number
	 */
	protected lastFrameTime: number = 0;

	/**
	 * @constructor
	 */
	constructor() {
		this.Handle_OnRequestAnimationFrame = this.Handle_OnRequestAnimationFrame.bind(this);
	}

	/**
	 * @return void
	 */
	protected pause(): void {
		this.enabled = false;
	}

	/**
	 * @return void
	 */
	protected unpause(): void {
		this.enabled = true;

		// Start loop
		this.Handle_OnRequestAnimationFrame();
	}

	// endregion: Instance

	// region: Event Handlers
	// ---------------------------------------------------------------------------

	/**
	 * @return Promise<void>
	 */
	protected async Handle_OnRequestAnimationFrame(): Promise<void> {
		// Do not process
		if (!this.enabled) {
			return;
		}

		// Diff
		const now = Date.now();

		// Iterate through items
		this.intervals.forEach((interval: IInterval) => {
			const diff = now - (interval.lastTick || 0);

			if (diff > interval.fps) {
				interval.func({});

				interval.lastTick = now;
			}
		});

		// Mark last frame time
		this.lastFrameTime = Date.now();

		// Request frame
		requestAnimationFrame(this.Handle_OnRequestAnimationFrame);
	}

	// endregion: Event Handlers
}
