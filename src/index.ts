// Put global reference to instantiable entrypoint
// ------------------------------------------------------------------------

declare global {
	interface Window {
		ChalkySticks: any;
	}
}

// Import library
// ------------------------------------------------------------------------

import ChalkySticks from './Lib/ChalkySticks';

// Exports
// ------------------------------------------------------------------------

export default ChalkySticks;

export * as Collection from './Collection';
export * as Enum from './Enum';
export * as Exception from './Exception';
export * as Model from './Model';
export * as Provider from './Provider';

export { default as Core } from './Common/Core';
export { default as Environment } from './Common/Environment';
export { default as Constants } from './Common/Constants';
export { default as Debounce } from './Common/Debounce';
export { default as EventDispatcher } from './Common/EventDispatcher';

export { Request } from 'restmc';
