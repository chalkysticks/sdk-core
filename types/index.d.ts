interface IStore {
	[key: string]: string | any;
	actions?: any;
	getters?: any;
	mutations?: any;
	state?: any;
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

interface IApiResponseError {
	code: number;
	message: string;
}
