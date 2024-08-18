import { Event } from '../index.js';

/**
 * @type type
 */
export type TSensorEventNames = 'devicemotion' | 'deviceorientation';

/**
 * TODO update interface
 * @type interface
 */
export interface IDeviceMotionEventData {
	acceleration: any;
	accelerationIncludingGravity: any;
	interval: number;
	rotationRate: any;
}

/**
 * @type interface
 */
export interface IDeviceOrientationEventData {
	absolute: boolean;
	alpha: number | null;
	beta: number | null;
	gamma: number | null;
}

/**
 * @type type
 */
export type TSensorEventHandler = (data: IDeviceMotionEventData | IDeviceOrientationEventData) => void;

/**
 * Sensor is a singleton class that handles sensor events
 * and dispatches them to the appropriate targets.
 *
 * Example Usage:
 *
 * 	import Sensor from '@/Input/Sensor';
 *
 * 	Sensor.start();
 *
 * 	Sensor.on('orientation', ({ data }) => {
 * 		console.log('Orientation:', data);
 * 	});
 *
 * 	Sensor.on('gyroscope', ({ data }) => {
 * 		console.log('Gyroscope:', data);
 * 	});
 *
 * 	Sensor.on('accelerometer', ({ data }) => {
 * 		console.log('Accelerometer:', data);
 * 	});
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Input
 * @project ChalkySticks SDK Core
 */
export class Sensor extends Event.Dispatcher {
	/**
	 * @type Sensor
	 */
	public static instance: Sensor;

	/**
	 * @return void
	 */
	public static start(): void {
		if (!this.instance) {
			this.instance = new Sensor();
		}
	}

	/**
	 * @return boolean
	 */
	public get hasMotion(): boolean {
		return 'ondevicemotion' in window;
	}

	/**
	 * @return boolean
	 */
	public get hasOrientation(): boolean {
		return 'ondeviceorientation' in window;
	}

	/**
	 * @return boolean
	 */
	public get hasSensors(): boolean {
		return this.hasOrientation && this.hasMotion;
	}

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Bindings
		this.Handle_OnDeviceMotion = this.Handle_OnDeviceMotion.bind(this);
		this.Handle_OnDeviceOrientation = this.Handle_OnDeviceOrientation.bind(this);

		// Automatically attach
		this.attachEvents();
	}

	/**
	 * @return void
	 */
	public attachEvents(): void {
		window.addEventListener('devicemotion', this.Handle_OnDeviceMotion);
		window.addEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
	}

	/**
	 * @return void
	 */
	public detachEvents(): void {
		window.removeEventListener('devicemotion', this.Handle_OnDeviceMotion);
		window.removeEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
	}

	// region: Event Handlers
	// ---------------------------------------------------------------------------

	/**
	 * @param DeviceMotionEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnDeviceMotion(e: IDeviceMotionEventData): Promise<void> {
		const { acceleration, accelerationIncludingGravity, rotationRate } = e;

		this.dispatch('gyroscope', rotationRate);
		this.dispatch('accelerometer', acceleration);
		this.dispatch('accelerometer:gravity', accelerationIncludingGravity);
	}

	/**
	 * @param DeviceOrientationEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnDeviceOrientation(e: IDeviceOrientationEventData): Promise<void> {
		const { absolute, alpha, beta, gamma } = e;

		this.dispatch('orientation', {
			absolute,
			alpha,
			beta,
			gamma,
		});
	}

	// endregion: Event Handlers
}
