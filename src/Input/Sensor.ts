import { Event } from '../index.js';

type GlobalContext = typeof window | undefined;

/**
 * @type type
 */
export type TSensorEventNames = 'devicemotion' | 'deviceorientation';

/**
 * TODO update interface (Interface definition remains the same)
 * @type interface
 */
export interface IDeviceMotionEventData {
	acceleration: any;
	accelerationIncludingGravity: any;
	interval: number;
	rotationRate: any;
}

/**
 * @type interface (Interface definition remains the same)
 */
export interface IDeviceOrientationEventData {
	absolute: boolean;
	alpha: number | null;
	beta: number | null;
	gamma: number | null;
}

/**
 * @type type (Type definition remains the same)
 */
export type TSensorEventHandler = (data: IDeviceMotionEventData | IDeviceOrientationEventData) => void;

/**
 * Sensor is a singleton class that handles sensor events
 * and dispatches them to the appropriate targets.
 * It gracefully handles environments where 'window' is not defined.
 *
 * Example Usage:
 *
 * import Sensor from '@/Input/Sensor'; // Adjust import path as needed
 *
 * if (Sensor.hasSensors) {
 * Sensor.start(); // Note: start() method wasn't in original, assuming attachEvents() serves this purpose
 *
 * Sensor.on('orientation', ({ data }) => {
 * console.log('Orientation:', data);
 * });
 *
 * Sensor.on('gyroscope', ({ data }) => {
 * console.log('Gyroscope:', data);
 * });
 *
 * Sensor.on('accelerometer', ({ data }) => {
 * console.log('Accelerometer:', data);
 * });
 * } else {
 * console.log('Device sensors not available in this environment.');
 * }
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Input
 * @project ChalkySticks SDK Core
 */
export class Sensor extends Event.Dispatcher {
	/**
	 * @type GlobalContext
	 */
	private _globalContext: GlobalContext;

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Determine the global context safely
		this._globalContext = typeof window !== 'undefined' ? window : undefined;

		// Bindings (only relevant if events can be attached)
		this.Handle_OnDeviceMotion = this.Handle_OnDeviceMotion.bind(this);
		this.Handle_OnDeviceOrientation = this.Handle_OnDeviceOrientation.bind(this);

		// Automatically attempt to attach events if in a suitable environment
		this.attachEvents();
	}

	/**
	 * Checks if the environment is browser-like and supports Device Motion events.
	 * @return boolean
	 */
	public get hasMotion(): boolean {
		// Check if window exists and then if the event handler property exists
		return !!this._globalContext && 'ondevicemotion' in this._globalContext;
	}

	/**
	 * Checks if the environment is browser-like and supports Device Orientation events.
	 * @return boolean
	 */
	public get hasOrientation(): boolean {
		// Check if window exists and then if the event handler property exists
		return !!this._globalContext && 'ondeviceorientation' in this._globalContext;
	}

	/**
	 * Checks if both motion and orientation sensors seem to be available.
	 * @return boolean
	 */
	public get hasSensors(): boolean {
		// Relies on the safe checks in hasMotion and hasOrientation
		return this.hasOrientation && this.hasMotion;
	}

	/**
	 * Attaches sensor event listeners if in a browser-like environment
	 * that supports them.
	 * @return void
	 */
	public attachEvents(): void {
		// Only proceed if window exists
		if (!this._globalContext) {
			// console.warn('Sensor: Cannot attach events, window object not found.');
			return;
		}

		// Attach listeners only if the specific capability exists
		if (this.hasMotion) {
			this._globalContext.addEventListener('devicemotion', this.Handle_OnDeviceMotion);
		}
		if (this.hasOrientation) {
			this._globalContext.addEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
		}
	}

	/**
	 * Detaches sensor event listeners if they were potentially attached.
	 * @return void
	 */
	public detachEvents(): void {
		// Only proceed if window exists
		if (!this._globalContext) {
			return;
		}

		// It's generally safe to attempt removal even if not added,
		// but checking capabilities might prevent unnecessary calls slightly.
		// We'll remove regardless to ensure cleanup if conditions changed.
		try {
			this._globalContext.removeEventListener('devicemotion', this.Handle_OnDeviceMotion);
			this._globalContext.removeEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
		} catch (e) {
			// Should not happen with the _globalContext check, but defensive
			console.error('Sensor: Error removing event listeners.', e);
		}
	}

	// region: Event Handlers (These will only be called if attachEvents succeeded)
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

// Singleton instance - This is now safe to instantiate immediately
// as the constructor and methods handle the absence of 'window'.
export default new Sensor();
