/**
 * @type type
 */
export type TDispatcherData = Record<string, any>;

/**
 * @type type
 */
export type TDispatcherCallback = (envelope: IDispatcherEvent) => void;

/**
 * @type interface
 */
export interface IDispatcherEvent {
	data: TDispatcherData;
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
export class DispatcherEvent {
	/**
	 * @type Array<TDispatcherCallback>
	 */
	public callbacks: TDispatcherCallback[];

	/**
	 * @type IDispatcherEvent
	 */
	protected envelope: IDispatcherEvent;

	/**
	 * @type string
	 */
	protected eventName: string;

	/**
	 * @constructor
	 * @param string eventName
	 * @param IDispatcherEvent envelope
	 */
	constructor(eventName: string, envelope?: IDispatcherEvent) {
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
	public registerCallback(callback: TDispatcherCallback): void {
		this.callbacks.push(callback);
	}

	/**
	 * @param TDispatcherCallback callback
	 * @return void
	 */
	public unregisterCallback(callback: TDispatcherCallback): void {
		const index = this.callbacks.indexOf(callback);

		if (index > -1) {
			this.callbacks.splice(index, 1);
		}
	}

	/**
	 * @param IDispatcherEvent envelope
	 * @return void
	 */
	public fire(envelope: IDispatcherEvent): void {
		const callbacks = this.callbacks.slice(0);

		// Merge class properties with passed in envelope
		callbacks.forEach((callback: TDispatcherCallback) => {
			callback(Object.assign({}, this.envelope, envelope));
		});
	}
}
