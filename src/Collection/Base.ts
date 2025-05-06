import * as Event from '../Event/index.js';
import * as Provider from '../Provider/index.js';
import Constants from '../Common/Constants.js';
import Environment from '../Common/Environment.js';
import { Collection, IDispatcherEvent, Model } from 'restmc';

type ReactiveHook = (instance: any) => void;

/**
 * @class CollectionBase
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Base<T extends Model> extends Collection<T> {
	/**
	 * Frameworks call this once to tell the SDK how to make an instance reactive
	 *
	 * @return void
	 */
	public static useReactiveHook(hook: ReactiveHook): void {
		this._reactiveHook = hook;
	}

	/**
	 * @type ReactiveHook
	 */
	private static _reactiveHook?: ReactiveHook;

	/**
	 * @type any
	 */
	public declare model: any;

	/**
	 * @type string
	 */
	public baseUrl: string = Environment.app.apiUrl;

	/**
	 * @type number
	 */
	public limit: number = Environment.app.limit;

	/**
	 * @type string
	 */
	public uniqueKey: string = '';

	/**
	 * @param object options
	 */
	constructor(options: any = {}, autoSetup: boolean = true) {
		super(options);

		autoSetup && this.setup(options);
	}

	/**
	 * @param object options
	 * @return void
	 */
	public setup(options: any = {}): void {
		// If a hook was registered, run it
		const ctor = this.constructor as typeof Base;
		ctor._reactiveHook?.(this);

		// Update baseUrl
		this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.apiUrl || Constants.API_URL;

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
		this.ensureToken(options.token);

		// Add headers
		this.setHeaders(Environment.headers);

		// Attach
		this.attachEvents();
	}

	/**
	 * @param string token
	 * @return void
	 */
	public ensureToken(token: string = ''): void {
		const store = Provider.Store.get();

		token = token || store?.state?.token || store?.getters['authentication/token'];
		token && this.setToken(token);
	}

	/**
	 * @return void
	 */
	public attachEvents(): void {
		this.on('add:before', (e: IDispatcherEvent) => {
			e.detail.model.baseUrl = this.baseUrl;
		});

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
			const data: any = { collection: this };

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
		this.off('add');
		this.off('error');
		this.off('finish');
		this.off('requesting');
	}

	/**
	 * @return boolean
	 */
	public shouldFetch(): boolean {
		if (this.loading) {
			return false;
		}

		return this.models.length === 0 || this.requestTime <= 0;
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
