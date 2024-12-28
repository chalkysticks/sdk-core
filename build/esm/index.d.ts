declare global {
    interface Window {
        ChalkySticks: any;
    }
}
export { default as ChalkySticks } from './ChalkySticks.js';
export * as Collection from './Collection/index.js';
export * as Enum from './Enum/index.js';
export * as Event from './Event/index.js';
export * as Exception from './Exception/index.js';
export * as Factory from './Factory/index.js';
export * as Input from './Input/index.js';
export * as Model from './Model/index.js';
export * as Provider from './Provider/index.js';
export * as Utility from './Utility/index.js';
export { Core } from './Common/Core.js';
export { default as Environment } from './Common/Environment.js';
export { default as Constants } from './Common/Constants.js';
export { IDispatcher } from './Event/Dispatcher.js';
export { IDispatcherEvent, TDispatcherCallback, TDispatcherData } from './Event/DispatcherEvent.js';
export { IGeolocationPayload } from './Utility/Geolocation.js';
export { IHysteresisOptions } from './Utility/Hysteresis.js';
export { Request } from 'restmc';
export declare const Version = "1.31.9";
