declare global {
	interface Window {
		ChalkySticks: any;
	}
}

export { default as ChalkySticks } from './ChalkySticks';

export * as Collection from './Collection';
export * as Enum from './Enum';
export * as Event from './Event';
export * as Exception from './Exception';
export * as Input from './Input';
export * as Model from './Model';
export * as Provider from './Provider';
export * as Utility from './Utility';

export { Core } from './Common/Core';
export { Environment } from './Common/Environment';
export { default as Constants } from './Common/Constants';

// I think exporting the interfaces here might have been an issue

export { Request } from 'restmc';

export const Version = '1.12.0';
