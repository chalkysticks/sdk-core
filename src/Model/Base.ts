import Constants from '../Common/Constants';
import Environment from '../Common/Environment';
import EventDispatcher from '../Common/EventDispatcher';
import StoreProvider from '../Provider/Store';
import { IAttributes, IDispatcherEvent, Model } from 'restmc';

/**
 * @class ModelBase
 * @package Model
 * @project ChalkySticks SDK Core
 */
export default class ModelBase extends Model {
	/**
	 * @type string
	 */
    public baseUrl: string = Environment.app.api_url;

	/**
	 * @param object options
	 */
	constructor(options: any = {}) {
		super(options);

		// Update baseUrl
		this.baseUrl = options.baseUrl || Constants.API_URL || this.baseUrl;

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
				targetType: 'model',
			});
		});
	}
}
