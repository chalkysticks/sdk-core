import { Event } from '../index.js';
import { Interval } from './Interval.js';

/**
 * @interface ILatchOptions
 */
export interface ILatchOptions {
	condition: () => boolean;
	duration?: number;
	name?: string | symbol;
}

/**
 *
 * Latch is a utility that monitors a condition and dispatches a
 * "trigger" event the first time the condition becomes true.
 *
 * Unlike Hysteresis, which smooths out noisy signals over time,
 * Latch is designed for discrete one-time thresholds (e.g., "when
 * video passes 2 seconds", or "5 seconds remain").
 *
 * After firing, the Latch automatically stops itself.
 * It also supports named registration and singleton-style access
 * to ensure only one Latch per logical name is active.
 *
 * This makes it ideal for fire-once milestones in time-based media
 * or reactive state monitoring.
 *
 * Example Usage:
 *
 *     import { Latch } from '@/Utility/Latch';
 *
 *     // Add with event listener
 *     Latch.add({
 *         condition: () => video.currentTime >= 2,
 *         duration: 50,
 *         name: 'video:two-seconds',
 *     }).on('trigger', () => {
 *         console.log('Passed 2 seconds');
 *     });
 *
 *     // Await with promise
 *     await Latch.wait({
 *         condition: () => video.duration - video.currentTime <= 5,
 *         name: 'video:five-seconds-left',
 *     });
 *
 *     console.log('5 seconds remaining');
 *
 * Notes:
 *
 * 	- You may provide a `name` to deduplicate or track instances.
 * 	- Internally uses the global Interval manager for ticking.
 * 	- Automatically cleans up after triggering unless manually removed.
 *
 * @class Latch
 * @package ChalkySticks SDK Core
 * @author Matt Kenefick <matt@chalkysticks.com>
 */
export class Latch extends Event.Dispatcher {
	// region: Static
	// ---------------------------------------------------------------------------

	/**
	 * @type Map<string | symbol, Latch>
	 */
	private static registry: Map<string | symbol, Latch> = new Map();

	/**
	 * @param ILatchOptions options
	 * @return Latch
	 */
	public static add(options: ILatchOptions): Latch {
		const name = options.name || Symbol();

		// Prevent duplicate latch creation for the same name
		if (this.registry.has(name)) {
			return this.registry.get(name)!;
		}

		const instance = new Latch(options);
		instance.start();

		this.registry.set(name, instance);

		return instance;
	}

	/**
	 * Waits for a condition to become true once, then resolves
	 *
	 * @param ILatchOptions options
	 * @return Promise<void>
	 */
	public static wait(options: ILatchOptions): Promise<void> {
		return new Promise((resolve) => {
			const latch = this.add(options);

			latch.once('trigger', () => {
				this.remove(options.name);
				resolve();
			});
		});
	}

	/**
	 * Remove a latch by name
	 *
	 * @param string | symbol name
	 * @return void
	 */
	public static remove(name?: string | symbol): void {
		if (!name || !this.registry.has(name)) {
			return;
		}

		const instance = this.registry.get(name)!;
		instance.stop();
		this.registry.delete(name);
	}

	/**
	 * Clear all latches
	 *
	 * @return void
	 */
	public static clear(): void {
		for (const instance of this.registry.values()) {
			instance.stop();
		}

		this.registry.clear();
	}

	// endregion: Static

	// region: Instance
	// ---------------------------------------------------------------------------

	/**
	 * @type () => boolean
	 */
	private readonly condition: () => boolean;

	/**
	 * @type number
	 */
	private readonly duration: number;

	/**
	 * @type string | symbol
	 */
	private readonly name: string | symbol;

	/**
	 * @type string | symbol
	 */
	private intervalName: string | symbol = '';

	/**
	 * @type boolean
	 */
	private hasTriggered: boolean = false;

	/**
	 * @param ILatchOptions options
	 */
	constructor(options: ILatchOptions) {
		super();

		this.condition = options.condition;
		this.duration = options.duration || 100;
		this.name = options.name || Symbol();
	}

	/**
	 * Start watching the condition
	 *
	 * @return void
	 */
	public start(): void {
		if (this.intervalName) {
			return;
		}

		this.intervalName = Interval.add(() => this.checkCondition(), this.duration, this.name);
	}

	/**
	 * Stop watching the condition
	 *
	 * @return void
	 */
	public stop(): void {
		if (this.intervalName) {
			Interval.remove(this.intervalName);
			this.intervalName = '';
		}
	}

	/**
	 * Check the condition and fire the trigger if needed
	 *
	 * @return void
	 */
	private checkCondition(): void {
		if (this.hasTriggered) {
			this.stop();
			return;
		}

		if (this.condition()) {
			this.hasTriggered = true;
			this.dispatch('trigger');
			this.stop();
		}
	}

	// endregion: Instance
}
