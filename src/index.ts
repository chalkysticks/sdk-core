declare global {
	interface Window {
		ChalkySticks: any;
	}
}

// Exports
// ------------------------------------------------------------------------

export { default as ChalkySticks } from './ChalkySticks';

export * as Collection from './Collection';
export * as Enum from './Enum';
export * as Event from './Event';
export * as Exception from './Exception';
export * as Model from './Model';
export * as Provider from './Provider';
export * as Utility from './Utility';

export { Core } from './Common/Core';
export { Environment } from './Common/Environment';
export { default as Constants } from './Common/Constants';

export { IDispatcher } from './Event/Dispatcher.js';
export { IDispatcherEvent, TDispatcherCallback, TDispatcherData } from './Event/DispatcherEvent.js';

export {
	IAttributes,
	IAxiosConfig,
	IAxiosError,
	IAxiosResponse,
	IAxiosSuccess,
	ICachedResponse,
	ICachedResponses,
	ICollectionChange,
	ICollectionMeta,
	IModelRequestOptions,
	IModelRequestQueryParams,
	IPagination,
	IProgressEvent,
	IRequestEvent,
	IResponse,
	ISortOptions,
	Request,
} from 'restmc';

export const Version = '1.5.0';
