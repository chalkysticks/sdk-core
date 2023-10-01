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
class Base extends restmc_1.Collection {
    constructor(options = {}) {
        var _a, _b;
        super(options);
        this.baseUrl = Environment_1.default.app.api_url;
        this.limit = Environment_1.default.app.limit;
        this.baseUrl = options.baseUrl || this.baseUrl || Environment_1.default.app.api_url || Constants_1.default.API_URL;
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
exports.Base = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0VBQTRDO0FBQzVDLHdFQUFnRDtBQUNoRCxnRkFBd0Q7QUFDeEQsOERBQThDO0FBQzlDLG1DQUlnQjtBQU9oQixNQUFhLElBQXNCLFNBQVEsbUJBQWE7SUFtQnZELFlBQVksVUFBZSxFQUFFOztRQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFYTixZQUFPLEdBQVcscUJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBSzFDLFVBQUssR0FBVyxxQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFTL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUkscUJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLG1CQUFTLENBQUMsT0FBTyxDQUFDO1FBRy9GLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDZixlQUFlLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7UUFHSCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUd0QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHbkMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO2FBQ0ksSUFBSSxNQUFBLE1BQUEsZUFBYSxDQUFDLEdBQUcsRUFBRSwwQ0FBRSxLQUFLLDBDQUFFLEtBQUssRUFBRTtZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0M7UUFHRCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQW1CLEVBQUUsRUFBRTs7WUFDeEMsTUFBTSxNQUFNLEdBQVcsTUFBQSxNQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTywwQ0FBRSxRQUFRLDBDQUFFLE1BQU0sQ0FBQztZQUcxRCxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ25CLHlCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQ3hEO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIseUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDckQ7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4Qix5QkFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN2RDtpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLHlCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQzFEO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIseUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDcEQ7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4Qix5QkFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUMvRDtZQUdELHlCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ2hELFFBQVEsRUFBRSxNQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTywwQ0FBRSxRQUFRO2dCQUNwQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixVQUFVLEVBQUUsWUFBWTthQUN4QixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFLTSxJQUFJO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUtNLElBQUk7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBS00sSUFBSTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRDtBQW5HRCxvQkFtR0MifQ==