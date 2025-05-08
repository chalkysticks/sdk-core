/**
 * @type type
 */
export type TDispatcherData = Record<string, any>;

/**
 * @type type
 */
export type TDispatcherCallback<T = any> = (envelope: IDispatcherEvent<T>) => void;

/**
 * @type interface
 */
export interface IDispatcherEvent<T = any> {
	data: T;
	event: {
		name: string;
		time: number;
	};
	target: any;
}

/**
 * This is a class that represents a particular event and
 * has callbacks associated with it. The class can have
 * base-level properties in the envelope, but it is merged
 * with whatever is supplied by .fire();
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Event
 * @project ChalkySticks SDK Core
 */
export class DispatcherEvent<T = any> {
	/**
	 * @type Array<TDispatcherCallback<T>>
	 */
	public callbacks: TDispatcherCallback<T>[];

	/**
	 * @type IDispatcherEvent<T>
	 */
	protected envelope!: IDispatcherEvent<T>;

	/**
	 * @type string
	 */
	protected eventName: string;

	/**
	 * @constructor
	 * @param string eventName
	 * @param IDispatcherEvent<T> envelope
	 */
	constructor(eventName: string, envelope?: IDispatcherEvent<T>) {
		this.callbacks = [];
		this.eventName = eventName;

		if (envelope) {
			this.envelope = envelope;
		}
	}

	/**
	 * @return void
	 */
	public clearCallbacks(): void {
		this.callbacks = [];
	}

	/**
	 * @param TDispatcherCallback callback
	 * @return void
	 */
	public registerCallback(callback: TDispatcherCallback<T>): void {
		this.callbacks.push(callback);
	}

	/**
	 * @param TDispatcherCallback callback
	 * @return void
	 */
	public unregisterCallback(callback: TDispatcherCallback<T>): void {
		const index = this.callbacks.indexOf(callback);

		if (index > -1) {
			this.callbacks.splice(index, 1);
		}
	}

	/**
	 * @param IDispatcherEvent envelope
	 * @return void
	 */
	public fire(envelope: IDispatcherEvent<T>): void {
		const callbacks = this.callbacks.slice(0);

		callbacks.forEach((callback: TDispatcherCallback<T>) => {
			callback(Object.assign({}, this.envelope, envelope));
		});
	}
}
