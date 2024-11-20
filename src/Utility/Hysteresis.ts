import { Event } from '../index.js';
import { Interval } from './Interval.js';

/**
 * @interface IHysteresisOptions
 */
export interface IHysteresisOptions {
	condition: () => boolean;
	threshold?: number;
	duration?: number;
}

/**
 * Hysteresis implement a mechanism where a variable is set or unset
 * based on the consistent fulfillment of a condition over a specified
 * duration or number of occurrences, preventing rapid toggling in
 * response to transient changes.
 *
 * It broadcasts the following events:
 *
 * 	- set: when the variable is set
 * 	- unset: when the variable is unset
 * 	- change: when the variable is set or unset
 *
 * Example Usage:
 *
 * 	import Hysteresis from '@/Utility/Hysteresis';
 *
 *	// Condition: turn heater on if temperature exceeds 70°C
 *	const temperatureControl = Utility.Hysteresis.add(
 * 		() => getTemperature() > 70,
 * 	);
 *
 * 	temperatureControl.on('set', () => turnHeaterOn());
 * 	temperatureControl.on('unset', () => turnHeaterOff())
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package ChalkySticks SDK Core
 */
export class Hysteresis extends Event.Dispatcher {
	/**
	 * @param IHysteresisOptions options
	 * @return Hysteresis
	 */
	public static add(options: IHysteresisOptions) {
		const instance = new Hysteresis(options.condition, options.threshold || 1, options.duration || 25);
		instance.start();

		return instance;
	}

	/**
	 * @param IHysteresisOptions options
	 * @return Hysteresis
	 */
	public static wait(options: IHysteresisOptions) {
		const instance = new Hysteresis(options.condition, options.threshold || 1, options.duration || 25);
		instance.start();

		return new Promise((resolve) => {
			instance.once('change', (data) => {
				instance.stop();
				resolve(data);
			});
		});
	}

	/**
	 * @type number
	 */
	private readonly threshold: number;

	/**
	 * @type number
	 */
	private readonly duration: number;

	/**
	 * @type number
	 */
	private conditionMetCount: number = 0;

	/**
	 * @type number
	 */
	private isVariableSet: boolean = false;

	/**
	 * @type () => boolean
	 */
	private condition: () => boolean;

	/**
	 * @type string | symbol
	 */
	private intervalName: string | symbol = '';

	/**
	 * @param () => boolean condition
	 * @param () => void onVariableSet
	 * @param () => void onVariableUnset
	 * @param number threshold
	 * @param number duration
	 */
	constructor(condition: () => boolean, threshold: number = 20, duration: number = 2000) {
		super();

		this.condition = condition;
		this.threshold = threshold;
		this.duration = duration;
	}

	/**
	 * @return void
	 */
	public reset() {
		this.conditionMetCount = 0;
	}

	/**
	 * @return void
	 */
	public start() {
		this.intervalName = Interval.add(() => this.checkCondition(), this.duration / this.threshold);
	}

	/**
	 * @return void
	 */
	public stop() {
		Interval.remove(this.intervalName);
	}

	/**
	 * @return void
	 */
	protected checkCondition() {
		const conditionMet = this.condition();

		if (conditionMet) {
			this.conditionMetCount = Math.min(this.threshold, this.conditionMetCount + 1);

			if (this.conditionMetCount >= this.threshold && !this.isVariableSet) {
				this.isVariableSet = true;
				this.dispatch('set');
				this.dispatch('change', {
					set: this.isVariableSet,
				});
			}
		} else {
			this.conditionMetCount = Math.max(0, this.conditionMetCount - 1);

			if (this.conditionMetCount <= 0 && this.isVariableSet) {
				this.isVariableSet = false;
				this.dispatch('unset');
				this.dispatch('change', {
					set: this.isVariableSet,
				});
			}
		}
	}
}
