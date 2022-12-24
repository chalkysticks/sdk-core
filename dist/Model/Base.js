"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("../Common/Constants");
const Environment_1 = require("../Common/Environment");
const EventDispatcher_1 = require("../Common/EventDispatcher");
const Store_1 = require("../Provider/Store");
const restmc_1 = require("restmc");
class ModelBase extends restmc_1.Model {
    constructor(options = {}) {
        var _a, _b;
        super(options);
        this.baseUrl = Environment_1.default.app.api_url;
        this.baseUrl = options.baseUrl || Constants_1.default.API_URL || this.baseUrl;
        if (options.token) {
            this.setToken(options.token);
        }
        else if ((_b = (_a = Store_1.default.get()) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.token) {
            this.setToken(Store_1.default.get().state.token);
        }
        this.on('error', (e) => {
            var _a, _b, _c;
            const status = (_b = (_a = e.detail.request) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.status;
            if (status === 401) {
                EventDispatcher_1.default.global.dispatch('request:unauthorized');
            }
            else if (status === 403) {
                EventDispatcher_1.default.global.dispatch('request:forbidden');
            }
            else if (status === 405) {
                EventDispatcher_1.default.global.dispatch('request:not_allowed');
            }
            else if (status === 406) {
                EventDispatcher_1.default.global.dispatch('request:not_acceptable');
            }
            else if (status === 409) {
                EventDispatcher_1.default.global.dispatch('request:conflict');
            }
            else if (status === 503) {
                EventDispatcher_1.default.global.dispatch('request:service_unavailable');
            }
            EventDispatcher_1.default.global.dispatch('request:error', {
                response: (_c = e.detail.request) === null || _c === void 0 ? void 0 : _c.response,
                target: this,
                targetType: 'model',
            });
        });
    }
}
exports.default = ModelBase;
//# sourceMappingURL=Base.js.map