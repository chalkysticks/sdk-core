import * as Event from '../Event/index.js';
import * as Provider from '../Provider/index.js';
import * as Format from '../Utility/Format.js';
import Constants from '../Common/Constants.js';
import Environment from '../Common/Environment.js';
import { IAttributes, IDispatcherEvent, Model } from 'restmc';

type ReactiveHook = (instance: any) => void;

/**
 * @class Base
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Base extends Model {
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
	 * @type string
	 */
	public baseUrl: string = Environment.app.apiUrl;

	/**
	 * @constructor
	 * @param object attributes
	 * @param object options
	 * @param boolean autoSetup
	 */
	constructor(attributes: IAttributes = {}, options: IAttributes = {}, autoSetup: boolean = true) {
		super(attributes, options);

		// Bindings
		this.Handle_OnLoginSuccess = this.Handle_OnLoginSuccess.bind(this);

		autoSetup && this.setup(options);
	}

	/**
	 * @param object options
	 * @return void
	 */
	public setup(options: IAttributes = {}): void {
		// If a hook was registered, run it
		const ctor = this.constructor as typeof Base;
		ctor._reactiveHook?.(this);

		// Update baseUrl
		this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.apiUrl || Constants.API_URL;

		// Disable withCredentials
		this.setOptions({
			withCredentials: false,
		});

		// Assign token
		this.ensureToken(options.token);

		// Add headers
		this.setHeaders(Environment.headers);

		// Attach events
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
		Event.Bus.off('login', this.Handle_OnLoginSuccess);

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

	/**
	 * If we have a created_at attribute, return it formatted.
	 *
	 * @param string format Format string for date output using tokens like 'YYYY-MM-DD HH:mm:ss'
	 * @return string Formatted date string
	 */
	public getCreatedAt(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
		const createdAt = this.attr('created_at') as string;

		if (!createdAt) {
			return '';
		}

		return Format.formatTime(createdAt, format);
	}

	/**
	 * Get the created_at attribute as a Date object
	 *
	 * @return Date|null Date object or null if not available
	 */
	public getCreatedAtDate(): Date | null {
		const createdAt = this.attr('created_at') as string;
		return createdAt ? Format.toDate(createdAt) : null;
	}

	/**
	 * Get how long ago the item was created in human readable format
	 *
	 * @param boolean shortUnits Whether to use abbreviated units (e.g., '2d' vs '2 days')
	 * @return string Time ago string (e.g., '2 days ago')
	 */
	public getCreatedAtTimeAgo(shortUnits: boolean = false): string {
		const createdAt = this.attr('created_at') as string;

		if (!createdAt) {
			return '';
		}

		return Format.getRelativeTime(createdAt, {
			shortUnits: shortUnits,
			suffix: 'ago',
			type: 'ago',
		});
	}

	/**
	 * If we have a updated_at attribute, return it formatted.
	 *
	 * @param string format Format string for date output using tokens like 'YYYY-MM-DD HH:mm:ss'
	 * @return string Formatted date string
	 */
	public getUpdatedAt(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
		const updatedAt = this.attr('updated_at') as string;

		if (!updatedAt) {
			return '';
		}

		return Format.formatTime(updatedAt, format);
	}

	/**
	 * Get the updated_at attribute as a Date object
	 *
	 * @return Date|null Date object or null if not available
	 */
	public getUpdatedAtDate(): Date | null {
		const updatedAt = this.attr('updated_at') as string;
		return updatedAt ? Format.toDate(updatedAt) : null;
	}

	/**
	 * Get how long ago the item was updated in human readable format
	 *
	 * @param boolean shortUnits Whether to use abbreviated units (e.g., '2d' vs '2 days')
	 * @return string Time ago string (e.g., '2 days ago')
	 */
	public getUpdatedAtTimeAgo(shortUnits: boolean = false): string {
		const updatedAt = this.attr('updated_at') as string;

		if (!updatedAt) {
			return '';
		}

		return Format.getRelativeTime(updatedAt, {
			shortUnits: shortUnits,
			suffix: 'ago',
			type: 'ago',
		});
	}

	/**
	 * If we have a deleted_at attribute, return it formatted.
	 *
	 * @param string format Format string for date output using tokens like 'YYYY-MM-DD HH:mm:ss'
	 * @return string Formatted date string
	 */
	public getDeletedAt(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
		const deletedAt = this.attr('deleted_at') as string;

		if (!deletedAt) {
			return '';
		}

		return Format.formatTime(deletedAt, format);
	}

	/**
	 * Get the deleted_at attribute as a Date object
	 *
	 * @return Date|null Date object or null if not available
	 */
	public getDeletedAtDate(): Date | null {
		const deletedAt = this.attr('deleted_at') as string;
		return deletedAt ? Format.toDate(deletedAt) : null;
	}

	/**
	 * Get how long ago the item was deleted in human readable format
	 *
	 * @param boolean shortUnits Whether to use abbreviated units (e.g., '2d' vs '2 days')
	 * @return string Time ago string (e.g., '2 days ago')
	 */
	public getDeletedAtTimeAgo(shortUnits: boolean = false): string {
		const deletedAt = this.attr('deleted_at') as string;

		if (!deletedAt) {
			return '';
		}

		return Format.getRelativeTime(deletedAt, {
			shortUnits: shortUnits,
			suffix: 'ago',
			type: 'ago',
		});
	}

	/**
	 * Check if this model has been deleted (soft-deleted)
	 *
	 * @return boolean True if the model has been deleted
	 */
	public isDeleted(): boolean {
		return !!this.attr('deleted_at');
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
