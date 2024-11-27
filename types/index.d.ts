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

declare module '@capacitor/geolocation' {
	export interface GeolocationPosition {
		coords: {
			accuracy: number;
			altitude: number | null;
			altitudeAccuracy: number | null;
			heading: number | null;
			latitude: number;
			longitude: number;
			speed: number | null;
		};
		timestamp: number;
	}

	export function getCurrentPosition(options?: {
		enableHighAccuracy?: boolean;
		timeout?: number;
		maximumAge?: number;
	}): Promise<GeolocationPosition>;

	export function watchPosition(
		successCallback: (position: GeolocationPosition) => void,
		errorCallback?: (error: any) => void,
		options?: {
			enableHighAccuracy?: boolean;
			timeout?: number;
			maximumAge?: number;
		},
	): string;

	export function clearWatch(watchId: string): void;
}
