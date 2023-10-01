"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const Constants_1 = __importDefault(require("../Common/Constants"));
const Environment_1 = __importDefault(require("../Common/Environment"));
const EventDispatcher_1 = __importDefault(require("../Common/EventDispatcher"));
const Store_1 = __importDefault(require("../Provider/Store"));
const restmc_1 = require("restmc");
class Base extends restmc_1.Model {
    constructor(attributes = {}, options = {}) {
        var _a, _b;
        super(attributes, options);
        this.baseUrl = Environment_1.default.app.api_url;
        this.baseUrl = options.baseUrl || this.baseUrl || Environment_1.default.app.api_url || Constants_1.default.API_URL;
        this.setOptions({
            withCredentials: false,
        });
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
exports.Base = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0VBQTRDO0FBQzVDLHdFQUFnRDtBQUNoRCxnRkFBd0Q7QUFDeEQsOERBQThDO0FBQzlDLG1DQUE4RDtBQU85RCxNQUFhLElBQUssU0FBUSxjQUFLO0lBUzlCLFlBQVksYUFBMEIsRUFBRSxFQUFFLFVBQXVCLEVBQUU7O1FBQ2xFLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFObEIsWUFBTyxHQUFXLHFCQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQVNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxxQkFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksbUJBQVMsQ0FBQyxPQUFPLENBQUM7UUFHL0YsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNmLGVBQWUsRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUdILElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjthQUNJLElBQUksTUFBQSxNQUFBLGVBQWEsQ0FBQyxHQUFHLEVBQUUsMENBQUUsS0FBSywwQ0FBRSxLQUFLLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO1FBR0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFtQixFQUFFLEVBQUU7O1lBQ3hDLE1BQU0sTUFBTSxHQUFXLE1BQUEsTUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sMENBQUUsUUFBUSwwQ0FBRSxNQUFNLENBQUM7WUFHMUQsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUNuQix5QkFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUN4RDtpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLHlCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3JEO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIseUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDdkQ7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4Qix5QkFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUMxRDtpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLHlCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3BEO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIseUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDL0Q7WUFHRCx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO2dCQUNoRCxRQUFRLEVBQUUsTUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sMENBQUUsUUFBUTtnQkFDcEMsTUFBTSxFQUFFLElBQUk7Z0JBQ1osVUFBVSxFQUFFLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBS00sSUFBSTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFLTSxJQUFJO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUtNLElBQUk7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0Q7QUFqRkQsb0JBaUZDIn0=