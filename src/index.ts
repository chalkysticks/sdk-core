declare global {
	interface Window {
		ChalkySticks: any;
	}
}

export { default as ChalkySticks } from './ChalkySticks';

export * as Collection from './Collection';
export * as Event from './Event';
export * as Exception from './Exception';
export * as Factory from './Factory';
export * as Input from './Input';
export * as Model from './Model';
export * as Provider from './Provider';
export * as Utility from './Utility';

export { Core } from './Common/Core';
export { default as Environment } from './Common/Environment';
export { default as Constants } from './Common/Constants';

export { IDispatcher } from './Event/Dispatcher.js';
export { IDispatcherEvent, TDispatcherCallback, TDispatcherData } from './Event/DispatcherEvent.js';
export { IHysteresisOptions } from './Utility/Hysteresis.js';

// I think exporting the interfaces here might have been an issue

export { Request } from 'restmc';

export const Version = '1.15.0';
