import * as Event from '../Event/index.js';
import * as Provider from '../Provider/index.js';
import Constants from '../Common/Constants.js';
import Environment from '../Common/Environment.js';
import { IAttributes, IDispatcherEvent, Model } from 'restmc';

/**
 * @class Base
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Base extends Model {
	/**
	 * @type string
	 */
	public baseUrl: string = Environment.app.apiUrl;

	/**
	 * @param object options
	 */
	constructor(attributes: IAttributes = {}, options: IAttributes = {}) {
		super(attributes, options);

		// Update baseUrl
		this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.apiUrl || Constants.API_URL;

		// Disable withCredentials
		this.setOptions({
			withCredentials: false,
		});

		// Assign token
		if (options.token) {
			this.setToken(options.token);
		} else {
			const store = Provider.Store.get();
			const token = store?.state?.token || store?.getters['authentication/token'];
			token && this.setToken(token);
		}

		// Attach events
		this.attachEvents();
	}

	/**
	 * @return void
	 */
	public attachEvents(): void {
		// Listen for loading
		this.on('requesting', (e: IDispatcherEvent) => {
			const data: any = { collection: this };
			this.dispatch('request:loading', data);
			Event.Bus.dispatch('request:loading', data);
		});

		// Listen for loaded
		this.on('finish', (e: IDispatcherEvent) => {
			const data: any = { collection: this };
			this.dispatch('request:loaded', data);
			Event.Bus.dispatch('request:loaded', data);
		});

		// Listen for Unauthorized
		this.on('error', (e: IDispatcherEvent) => {
			const status: number = e.detail.request?.status || e.detail.request?.response?.status;
			const data: any = { model: this };

			// Unauthorized
			if (status === 401) {
				this.dispatch('request:unauthorized', data);
				Event.Bus.dispatch('request:unauthorized', data);
			} else if (status === 403) {
				this.dispatch('request:forbidden', data);
				Event.Bus.dispatch('request:forbidden', data);
			} else if (status === 405) {
				this.dispatch('request:not_allowed', data);
				Event.Bus.dispatch('request:not_allowed', data);
			} else if (status === 406) {
				this.dispatch('request:not_acceptable', data);
				Event.Bus.dispatch('request:not_acceptable', data);
			} else if (status === 409) {
				this.dispatch('request:conflict', data);
				Event.Bus.dispatch('request:conflict', data);
			} else if (status === 503) {
				this.dispatch('request:service_unavailable', data);
				Event.Bus.dispatch('request:service_unavailable', data);
			}

			// General error
			this.dispatch('request:error', data);
			Event.Bus.dispatch('request:error', data);
		});
	}

	/**
	 * @return void
	 */
	public detachEvents(): void {
		this.off('requesting');
		this.off('finish');
		this.off('error');
	}

	/**
	 * @return string
	 */
	public getBaseUrl(): string {
		return Environment.app.localUrl || this.baseUrl;
	}

	/**
	 * @return boolean
	 */
	public isV1(): boolean {
		return this.baseUrl.toLowerCase().indexOf('/v1') > 0;
	}

	/**
	 * @return boolean
	 */
	public isV2(): boolean {
		return this.baseUrl.toLowerCase().indexOf('/v2') > 0;
	}

	/**
	 * @return boolean
	 */
	public isV3(): boolean {
		return this.baseUrl.toLowerCase().indexOf('/v3') > 0;
	}
}
