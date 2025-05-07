import * as Event from '../Event/index.js';
import * as Provider from '../Provider/index.js';
import * as Format from '../Utility/Format.js';
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

		// Bindings
		this.Handle_OnLoginSuccess = this.Handle_OnLoginSuccess.bind(this);

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
		Event.Bus.on('login', this.Handle_OnLoginSuccess);

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
		Event.Bus.off('login', this.Handle_OnLoginSuccess);
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

	/**
	 * Get the created_at field for a model with the specified ID
	 *
	 * @param string|number id The ID of the model to find
	 * @param string format Format string for date output using tokens like 'YYYY-MM-DD HH:mm:ss'
	 * @return string Formatted date string
	 */
	public getCreatedAt(id: string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
		const model = this.get(id);
		if (!model) {
			return '';
		}

		const createdAt = model.attr('created_at') as string;
		if (!createdAt) {
			return '';
		}

		return Format.formatTime(createdAt, format);
	}

	/**
	 * Get the created_at attribute as a Date object for a model with the specified ID
	 *
	 * @param string|number id The ID of the model to find
	 * @return Date|null Date object or null if not available
	 */
	public getCreatedAtDate(id: string | number): Date | null {
		const model = this.get(id);
		if (!model) {
			return null;
		}

		const createdAt = model.attr('created_at') as string;
		return createdAt ? Format.toDate(createdAt) : null;
	}

	/**
	 * Get how long ago a model was created in human readable format
	 *
	 * @param string|number id The ID of the model to find
	 * @param boolean shortUnits Whether to use abbreviated units (e.g., '2d' vs '2 days')
	 * @return string Time ago string (e.g., '2 days ago')
	 */
	public getCreatedAtTimeAgo(id: string | number, shortUnits: boolean = false): string {
		const model = this.get(id);
		if (!model) {
			return '';
		}

		const createdAt = model.attr('created_at') as string;
		if (!createdAt) {
			return '';
		}

		return Format.getRelativeTime(createdAt, {
			type: 'ago',
			suffix: 'ago',
			shortUnits: shortUnits,
		});
	}

	/**
	 * Get the updated_at field for a model with the specified ID
	 *
	 * @param string|number id The ID of the model to find
	 * @param string format Format string for date output using tokens like 'YYYY-MM-DD HH:mm:ss'
	 * @return string Formatted date string
	 */
	public getUpdatedAt(id: string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
		const model = this.get(id);
		if (!model) {
			return '';
		}

		const updatedAt = model.attr('updated_at') as string;
		if (!updatedAt) {
			return '';
		}

		return Format.formatTime(updatedAt, format);
	}

	/**
	 * Get the updated_at attribute as a Date object for a model with the specified ID
	 *
	 * @param string|number id The ID of the model to find
	 * @return Date|null Date object or null if not available
	 */
	public getUpdatedAtDate(id: string | number): Date | null {
		const model = this.get(id);
		if (!model) {
			return null;
		}

		const updatedAt = model.attr('updated_at') as string;
		return updatedAt ? Format.toDate(updatedAt) : null;
	}

	/**
	 * Get how long ago a model was updated in human readable format
	 *
	 * @param string|number id The ID of the model to find
	 * @param boolean shortUnits Whether to use abbreviated units (e.g., '2d' vs '2 days')
	 * @return string Time ago string (e.g., '2 days ago')
	 */
	public getUpdatedAtTimeAgo(id: string | number, shortUnits: boolean = false): string {
		const model = this.get(id);
		if (!model) {
			return '';
		}

		const updatedAt = model.attr('updated_at') as string;
		if (!updatedAt) {
			return '';
		}

		return Format.getRelativeTime(updatedAt, {
			type: 'ago',
			suffix: 'ago',
			shortUnits: shortUnits,
		});
	}

	/**
	 * Get the deleted_at field for a model with the specified ID
	 *
	 * @param string|number id The ID of the model to find
	 * @param string format Format string for date output using tokens like 'YYYY-MM-DD HH:mm:ss'
	 * @return string Formatted date string
	 */
	public getDeletedAt(id: string | number, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
		const model = this.get(id);
		if (!model) {
			return '';
		}

		const deletedAt = model.attr('deleted_at') as string;
		if (!deletedAt) {
			return '';
		}

		return Format.formatTime(deletedAt, format);
	}

	/**
	 * Get the deleted_at attribute as a Date object for a model with the specified ID
	 *
	 * @param string|number id The ID of the model to find
	 * @return Date|null Date object or null if not available
	 */
	public getDeletedAtDate(id: string | number): Date | null {
		const model = this.get(id);
		if (!model) {
			return null;
		}

		const deletedAt = model.attr('deleted_at') as string;
		return deletedAt ? Format.toDate(deletedAt) : null;
	}

	/**
	 * Get how long ago a model was deleted in human readable format
	 *
	 * @param string|number id The ID of the model to find
	 * @param boolean shortUnits Whether to use abbreviated units (e.g., '2d' vs '2 days')
	 * @return string Time ago string (e.g., '2 days ago')
	 */
	public getDeletedAtTimeAgo(id: string | number, shortUnits: boolean = false): string {
		const model = this.get(id);
		if (!model) {
			return '';
		}

		const deletedAt = model.attr('deleted_at') as string;
		if (!deletedAt) {
			return '';
		}

		return Format.getRelativeTime(deletedAt, {
			type: 'ago',
			suffix: 'ago',
			shortUnits: shortUnits,
		});
	}

	/**
	 * Check if a model with the specified ID has been deleted (soft-deleted)
	 *
	 * @param string|number id The ID of the model to find
	 * @return boolean True if the model has been deleted, false otherwise or if model not found
	 */
	public isDeleted(id: string | number): boolean {
		const model = this.get(id);
		if (!model) {
			return false;
		}

		return !!model.attr('deleted_at');
	}

	/**
	 * @param IDispatcherData
	 * @return Promise<void>
	 */
	protected async Handle_OnLoginSuccess(e: any): Promise<void> {
		const token = e.data.token;

		this.ensureToken(token);
	}
}
