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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9FQUE0QztBQUM1Qyx3RUFBZ0Q7QUFDaEQsZ0ZBQXdEO0FBQ3hELDhEQUE4QztBQUM5QyxtQ0FBOEQ7QUFPOUQsTUFBYSxJQUFLLFNBQVEsY0FBSztJQVM5QixZQUFZLGFBQTBCLEVBQUUsRUFBRSxVQUF1QixFQUFFOztRQUNsRSxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBTmxCLFlBQU8sR0FBVyxxQkFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFTbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUkscUJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLG1CQUFTLENBQUMsT0FBTyxDQUFDO1FBRy9GLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDZixlQUFlLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7UUFHSCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7YUFDSSxJQUFJLE1BQUEsTUFBQSxlQUFhLENBQUMsR0FBRyxFQUFFLDBDQUFFLEtBQUssMENBQUUsS0FBSyxFQUFFO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztRQUdELElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBbUIsRUFBRSxFQUFFOztZQUN4QyxNQUFNLE1BQU0sR0FBVyxNQUFBLE1BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLFFBQVEsMENBQUUsTUFBTSxDQUFDO1lBRzFELElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDbkIseUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDeEQ7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4Qix5QkFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNyRDtpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLHlCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ3ZEO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIseUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7YUFDMUQ7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4Qix5QkFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNwRDtpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLHlCQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2FBQy9EO1lBR0QseUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRTtnQkFDaEQsUUFBUSxFQUFFLE1BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLDBDQUFFLFFBQVE7Z0JBQ3BDLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFVBQVUsRUFBRSxPQUFPO2FBQ25CLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUtNLElBQUk7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBS00sSUFBSTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFLTSxJQUFJO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNEO0FBakZELG9CQWlGQyJ9