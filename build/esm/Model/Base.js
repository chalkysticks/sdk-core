import * as Event from '../Event';
import * as Provider from '../Provider';
import Constants from '../Common/Constants';
import Environment from '../Common/Environment';
import { Model } from 'restmc';
export class Base extends Model {
    constructor(attributes = {}, options = {}) {
        super(attributes, options);
        this.baseUrl = Environment.app.api_url;
        this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.api_url || Constants.API_URL;
        this.setOptions({
            withCredentials: false,
        });
        if (options.token) {
            this.setToken(options.token);
        }
        else if (Provider.Store.get()?.state?.token) {
            this.setToken(Provider.Store.get().state.token);
        }
        this.attachEvents();
    }
    attachEvents() {
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
        this.off('requesting');
        this.off('finish');
        this.off('error');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxRQUFRLE1BQU0sYUFBYSxDQUFDO0FBQ3hDLE9BQU8sU0FBUyxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sV0FBVyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBaUMsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTzlELE1BQU0sT0FBTyxJQUFLLFNBQVEsS0FBSztJQVM5QixZQUFZLGFBQTBCLEVBQUUsRUFBRSxVQUF1QixFQUFFO1FBQ2xFLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFOckIsWUFBTyxHQUFXLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBU2hELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFHL0YsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNmLGVBQWUsRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUdILElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUdELElBQUksQ0FB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