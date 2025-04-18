import * as Event from '../Event/index.js';
import * as Provider from '../Provider/index.js';
import Constants from '../Common/Constants.js';
import Environment from '../Common/Environment.js';
import { Collection } from 'restmc';
export class Base extends Collection {
    constructor(options = {}) {
        super(options);
        this.baseUrl = Environment.app.apiUrl;
        this.limit = Environment.app.limit;
        this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.apiUrl || Constants.API_URL;
        this.setOptions({
            withCredentials: false,
        });
        this.limit = options.limit || this.limit;
        this.page = options.page || this.page;
        this.builder.qp('limit', this.limit);
        this.builder.qp('page', this.page);
        if (options.token) {
            this.setToken(options.token);
        }
        else {
            const store = Provider.Store.get();
            const token = store?.state?.token || store?.getters['authentication/token'];
            token && this.setToken(token);
        }
        this.attachEvents();
    }
    attachEvents() {
        this.on('add:before', (e) => {
            e.detail.model.baseUrl = this.baseUrl;
        });
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
            const data = { collection: this };
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
        this.off('requesting');
        this.off('finish');
        this.off('error');
    }
    shouldFetch() {
        if (this.loading) {
            return false;
        }
        return this.models.length === 0 || this.requestTime <= 0;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEtBQUssUUFBUSxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQTJCLE1BQU0sUUFBUSxDQUFDO0FBTzdELE1BQU0sT0FBTyxJQUFzQixTQUFRLFVBQWE7SUFtQnZELFlBQVksVUFBZSxFQUFFO1FBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQVhULFlBQU8sR0FBVyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUt6QyxVQUFLLEdBQVcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFTNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUc5RixJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2YsZUFBZSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBR0gsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFHdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUs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