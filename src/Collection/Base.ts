import Constants from '../Common/Constants';
import Environment from '../Common/Environment';
import EventDispatcher from '../Common/EventDispatcher';
import ModelBase from '../Model/Base';
import StoreProvider from '../Provider/Store';
import {
	Collection,
	IAttributes,
	IDispatcherEvent,
	IModelRequestOptions,
	IModelRequestQueryParams,
	Model,
	Request,
} from 'restmc';

/**
 * @class CollectionBase
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export default class Base<T extends Model> extends Collection<T> {
	/**
	 * @type any
	 */
	public declare model: any;

    /**
     * @type string
     */
    public baseUrl: string = Environment.app.api_url;

    /**
     * @type number
     */
    public limit: number = Environment.app.limit;

	/**
	 * @param object options
	 */
	constructor(options: any = {}) {
		super(options);

		// Update baseUrl
		this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.api_url || Constants.API_URL;

		// Disable withCredentials
		this.setOptions({
			withCredentials: false,
		});

		// Limits
		this.limit = options.limit || this.limit;
		this.page = options.page || this.page;

		// Build
		this.builder.qp('limit', this.limit);
		this.builder.qp('page', this.page);

		// Assign token
		if (options.token) {
			this.setToken(options.token);
		}
		else if (StoreProvider.get()?.state?.token) {
			this.setToken(StoreProvider.get().state.token);
		}

		// Listen for Unauthorized
		this.on('error', (e: IDispatcherEvent) => {
			const status: number = e.detail.request?.response?.status;

			// Unauthorized
			if (status === 401) {
				EventDispatcher.global.dispatch('request:unauthorized');
			}
			else if (status === 403) {
				EventDispatcher.global.dispatch('request:forbidden');
			}
			else if (status === 405) {
				EventDispatcher.global.dispatch('request:not_allowed');
			}
			else if (status === 406) {
				EventDispatcher.global.dispatch('request:not_acceptable');
			}
			else if (status === 409) {
				EventDispatcher.global.dispatch('request:conflict');
			}
			else if (status === 503) {
				EventDispatcher.global.dispatch('request:service_unavailable');
			}

			// General error
			EventDispatcher.global.dispatch('request:error', {
				response: e.detail.request?.response,
				target: this,
				targetType: 'collection',
			});
		});
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
