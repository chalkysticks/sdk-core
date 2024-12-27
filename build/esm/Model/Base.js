import * as Event from '../Event/index.js';
import * as Provider from '../Provider/index.js';
import Constants from '../Common/Constants.js';
import Environment from '../Common/Environment.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLEVBQWlDLEtBQUssRUFBRSxNQUFNLFFBQVEsQ0FBQztBQU85RCxNQUFNLE9BQU8sSUFBSyxTQUFRLEtBQUs7SUFTOUIsWUFBWSxhQUEwQixFQUFFLEVBQUUsVUFBdUIsRUFBRTtRQUNsRSxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBTnJCLFlBQU8sR0FBVyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQVNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDO1FBRy9GLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDZixlQUFlLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7UUFHSCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO2FBQU0sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFHRCxJQUFJ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