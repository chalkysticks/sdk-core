import * as Event from '../Event/index.js';
import * as Provider from '../Provider/index.js';
import * as Format from '../Utility/Format.js';
import Constants from '../Common/Constants.js';
import Environment from '../Common/Environment.js';
import { Model } from 'restmc';
export class Base extends Model {
    static useReactiveHook(hook) {
        this._reactiveHook = hook;
    }
    constructor(attributes = {}, options = {}, autoSetup = true) {
        super(attributes, options);
        this.baseUrl = Environment.app.apiUrl;
        this.Handle_OnLoginSuccess = this.Handle_OnLoginSuccess.bind(this);
        autoSetup && this.setup(options);
    }
    setup(options = {}) {
        const ctor = this.constructor;
        ctor._reactiveHook?.(this);
        this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.apiUrl || Constants.API_URL;
        this.setOptions({
            withCredentials: false,
        });
        this.ensureToken(options.token);
        this.setHeaders(Environment.headers);
        this.attachEvents();
    }
    ensureToken(token = '') {
        const store = Provider.Store.get();
        token = token || store?.state?.token || store?.getters['authentication/token'];
        token && this.setToken(token);
    }
    attachEvents() {
        Event.Bus.on('login', this.Handle_OnLoginSuccess);
        this.on('requesting', (e) => {
            const data = { collection: this };
            this.dispatch('request:loading', data);
            Event.Bus.dispatch('request:loading', data);
        });
        this.on('finish', (e) => {
            const data = { collection: this };
            this.dispatch('request:loaded', data);
            Event.Bus.dispatch('request:loaded', data);
        });
        this.on('error', (e) => {
            const status = e.detail.request?.status || e.detail.request?.response?.status;
            const data = { model: this };
            if (status === 401) {
                this.dispatch('request:unauthorized', data);
                Event.Bus.dispatch('request:unauthorized', data);
            }
            else if (status === 403) {
                this.dispatch('request:forbidden', data);
                Event.Bus.dispatch('request:forbidden', data);
            }
            else if (status === 405) {
                this.dispatch('request:not_allowed', data);
                Event.Bus.dispatch('request:not_allowed', data);
            }
            else if (status === 406) {
                this.dispatch('request:not_acceptable', data);
                Event.Bus.dispatch('request:not_acceptable', data);
            }
            else if (status === 409) {
                this.dispatch('request:conflict', data);
                Event.Bus.dispatch('request:conflict', data);
            }
            else if (status === 503) {
                this.dispatch('request:service_unavailable', data);
                Event.Bus.dispatch('request:service_unavailable', data);
            }
            this.dispatch('request:error', data);
            Event.Bus.dispatch('request:error', data);
        });
    }
    detachEvents() {
        Event.Bus.off('login', this.Handle_OnLoginSuccess);
        this.off('requesting');
        this.off('finish');
        this.off('error');
    }
    getBaseUrl() {
        return Environment.app.localUrl || this.baseUrl;
    }
    isV1() {
        return this.baseUrl.toLowerCase().indexOf('/v1') > 0;
    }
    isV2() {
        return this.baseUrl.toLowerCase().indexOf('/v2') > 0;
    }
    isV3() {
        return this.baseUrl.toLowerCase().indexOf('/v3') > 0;
    }
    getCreatedAt(format = 'YYYY-MM-DD HH:mm:ss') {
        const createdAt = this.attr('created_at');
        if (!createdAt) {
            return '';
        }
        return Format.formatTime(createdAt, format);
    }
    getCreatedAtDate() {
        const createdAt = this.attr('created_at');
        return createdAt ? Format.toDate(createdAt) : null;
    }
    getCreatedAtTimeAgo(shortUnits = false) {
        const createdAt = this.attr('created_at');
        if (!createdAt) {
            return '';
        }
        return Format.getRelativeTime(createdAt, {
            shortUnits: shortUnits,
            suffix: 'ago',
            type: 'ago',
        });
    }
    getUpdatedAt(format = 'YYYY-MM-DD HH:mm:ss') {
        const updatedAt = this.attr('updated_at');
        if (!updatedAt) {
            return '';
        }
        return Format.formatTime(updatedAt, format);
    }
    getUpdatedAtDate() {
        const updatedAt = this.attr('updated_at');
        return updatedAt ? Format.toDate(updatedAt) : null;
    }
    getUpdatedAtTimeAgo(shortUnits = false) {
        const updatedAt = this.attr('updated_at');
        if (!updatedAt) {
            return '';
        }
        return Format.getRelativeTime(updatedAt, {
            shortUnits: shortUnits,
            suffix: 'ago',
            type: 'ago',
        });
    }
    getDeletedAt(format = 'YYYY-MM-DD HH:mm:ss') {
        const deletedAt = this.attr('deleted_at');
        if (!deletedAt) {
            return '';
        }
        return Format.formatTime(deletedAt, format);
    }
    getDeletedAtDate() {
        const deletedAt = this.attr('deleted_at');
        return deletedAt ? Format.toDate(deletedAt) : null;
    }
    getDeletedAtTimeAgo(shortUnits = false) {
        const deletedAt = this.attr('deleted_at');
        if (!deletedAt) {
            return '';
        }
        return Format.getRelativeTime(deletedAt, {
            shortUnits: shortUnits,
            suffix: 'ago',
            type: 'ago',
        });
    }
    isDeleted() {
        return !!this.attr('deleted_at');
    }
    async Handle_OnLoginSuccess(e) {
        const token = e.data.token;
        this.ensureToken(token);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEtBQUssTUFBTSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBaUMsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBUzlELE1BQU0sT0FBTyxJQUFLLFNBQVEsS0FBSztJQU12QixNQUFNLENBQUMsZUFBZSxDQUFDLElBQWtCO1FBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFrQkQsWUFBWSxhQUEwQixFQUFFLEVBQUUsVUFBdUIsRUFBRSxFQUFFLFlBQXFCLElBQUk7UUFDN0YsS0FBSyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQVRyQixZQUFPLEdBQVcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFZL0MsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkUsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQU1NLEtBQUssQ0FBQyxVQUF1QixFQUFFO1FBRXJDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUEwQixDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUczQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxX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