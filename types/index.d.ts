interface IStore {
	[key: string]: string | any;
	actions?: IStoreActions;
	commit?: any;
	dispatch?: any;
	getters?: any;
	mutations?: IStoreMutations;
	state?: any;
}

interface IStoreActions {
	[key: string]: (context: any, payload?: any) => any;
}

interface IStoreMutations {
	[key: string]: (state: any, payload?: any) => any;
}

interface IGoogleAnalytics {
	id: string;
}

interface IEnvironmentApplication {
	api_url: string;
	limit: number;
}

interface IEnvironmentGoogle {
	analytics: any;
	api_key: string;
}

interface IEventPresetThumbnailLinkClick {
	presetModel: any;
}

interface IEventTabClick {
	slug: string;
	tab: string;
}

interface IEventOptionTrigger {
	event: string;
	option: any;
}

interface IGeoLocation {
	latitude: number;
	longitude: number;
}

interface IApiResponseError {
	code: number;
	message: string;
}
