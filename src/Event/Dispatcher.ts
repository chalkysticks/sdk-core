import { DispatcherEvent, IDispatcherEvent, TDispatcherCallback, TDispatcherData } from './DispatcherEvent.js';

/**
 * @interface IDispatcher
 */
export interface IDispatcher {
	dispatch(eventName: string, data?: TDispatcherData): void;
	on(eventName: string, callback: TDispatcherCallback): void;
	off(eventName: string, callback?: TDispatcherCallback): void;
}

/**
 * Dispatcher is a simple event dispatcher that allows for easy event
 * registration and firing.
 *
 * Example Usage:
 *
 * class MyClass extends Event.Dispatcher {
 *     myMethod() {
 *         this.dispatch('myEvent', { foo: 'bar' });
 *     }
 * }
 *
 * const myClass = new MyClass();
 *
 * myClass.on('myEvent', (e) => {
 *    console.log(e.data.foo); // bar
 * });
 *
 * myClass.myMethod();
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Event
 * @project ChalkySticks SDK Core
 */
export class Dispatcher implements IDispatcher {
	/**
	 * @type Record<string, DispatcherEvent<any>>
	 */
	protected events: Record<string, DispatcherEvent<any>> = {};

	/**
	 * Sometimes we might want to explicitly describe the data when
	 * dispatching like this:
	 *
	 * ChalkySticks.Core.Event.Bus.dispatch<CustomType>('custom:event', customData);
	 *
	 * and/or
	 *
	 * ChalkySticks.Core.Event.Bus.on<IGeolocationPayload>('location:change', this.Handle_OnLocationChange);
	 *
	 * @param string eventName
	 * @param TDispatcherData data
	 * @return void
	 */
	public dispatch<T = any>(eventName: string, data?: T): void {
		const event = this.events[eventName] as DispatcherEvent<T>;

		if (event) {
			event.fire({
				data: data as T,
				event: {
					name: eventName,
					time: Date.now(),
				},
				target: this,
			});
		}
	}

	/**
	 * @param string eventName
	 * @param TDispatcherCallback callback
	 * @return void
	 */
	public on<T = any>(eventName: string, callback: TDispatcherCallback<T>): void {
		let event = this.events[eventName] as DispatcherEvent<T>;

		// Create new event, if not exists
		if (!event) {
			event = new DispatcherEvent<T>(eventName);
			this.events[eventName] = event;
		}

		// Add callback to said event
		event.registerCallback(callback);
	}

	/**
	 * @param string eventName
	 * @param TDispatcherCallback callback
	 * @return void
	 */
	public once<T = any>(eventName: string, callback: TDispatcherCallback<T>): void {
		const onceCallback = (envelope: IDispatcherEvent<T>) => {
			callback(envelope);
			this.off(eventName, onceCallback);
		};

		this.on(eventName, onceCallback);
	}

	/**
	 * @param string eventName
	 * @param TDispatcherCallback callback
	 * @return void
	 */
	public off<T = any>(eventName: string, callback?: TDispatcherCallback<T>): void {
		const event: DispatcherEvent<T> = this.events[eventName] as DispatcherEvent<T>;

		// Clear all if we don't supply a callback
		if (event && !callback) {
			event.clearCallbacks();
			delete this.events[eventName];
		}

		// Remove specific function
		else if (event && callback && event.callbacks.indexOf(callback) > -1) {
			event.unregisterCallback(callback);

			if (event.callbacks.length === 0) {
				delete this.events[eventName];
			}
		}
	}

	// region: Aliases
	// ---------------------------------------------------------------------------

	/**
	 * @param string eventName
	 * @param TDispatcherData data
	 * @return void
	 */
	public $emit(eventName: string, data: TDispatcherData = {}): void {
		return this.dispatch(eventName, data);
	}

	/**
	 * @param string eventName
	 * @param TDispatcherData data
	 * @return void
	 */
	public trigger(eventName: string, data: TDispatcherData = {}): void {
		return this.dispatch(eventName, data);
	}

	/**
	 * @param string eventName
	 * @param TDispatcherCallback<T> callback
	 * @return void
	 */
	public $on<T = any>(eventName: string, callback: TDispatcherCallback<T>): void {
		return this.on(eventName, callback);
	}

	/**
	 * @param string eventName
	 * @param TDispatcherCallback<T> callback
	 * @return void
	 */
	public $off<T = any>(eventName: string, callback: TDispatcherCallback<T>): void {
		return this.off(eventName, callback);
	}

	// endregion: Aliases
}

/**
 * Create a global event bus that can be used
 * throughout the application.
 */
export default new Dispatcher();
