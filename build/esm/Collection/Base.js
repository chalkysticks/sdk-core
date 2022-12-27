import Constants from '../Common/Constants';
import Environment from '../Common/Environment';
import EventDispatcher from '../Common/EventDispatcher';
import StoreProvider from '../Provider/Store';
import { Collection, } from 'restmc';
export default class Base extends Collection {
    baseUrl = Environment.app.api_url;
    limit = Environment.app.limit;
    options = { withCredentials: false };
    constructor(options = {}) {
        super(options);
        this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.api_url || Constants.API_URL;
        this.limit = options.limit || this.limit;
        this.page = options.page || this.page;
        this.builder.qp('limit', this.limit);
        this.builder.qp('page', this.page);
        if (options.token) {
            this.setToken(options.token);
        }
        else if (StoreProvider.get()?.state?.token) {
            this.setToken(StoreProvider.get().state.token);
        }
        this.on('error', (e) => {
            const status = e.detail.request?.response?.status;
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
            EventDispatcher.global.dispatch('request:error', {
                response: e.detail.request?.response,
                target: this,
                targetType: 'collection',
            });
        });
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
//# sourceMappingURL=Base.js.map