import Constants from '../Common/Constants';
import Environment from '../Common/Environment';
import EventDispatcher from '../Common/EventDispatcher';
import StoreProvider from '../Provider/Store';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9CYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sV0FBVyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sZUFBZSxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBQzlDLE9BQU8sRUFBaUMsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTzlELE1BQU0sT0FBTyxJQUFLLFNBQVEsS0FBSztJQVM5QixZQUFZLGFBQTBCLEVBQUUsRUFBRSxVQUF1QixFQUFFO1FBQ2xFLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFObEIsWUFBTyxHQUFXLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBU25ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFHL0YsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNmLGVBQWUsRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUdILElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUM7YUFDSSxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFHRCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQW1CLEVBQUUsRUFBRTtZQUN4QyxNQUFNLE1BQU0sR0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBRzFELElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pELENBQUM7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdEQsQ0FBQztpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDekIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4RCxDQUFDO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUN6QixlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNELENBQUM7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDckQsQ0FBQztpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDekIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBR0QsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFO2dCQUNoRCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsUUFBUTtnQkFDcEMsTUFBTSxFQUFFLElBQUk7Z0JBQ1osVUFBVSxFQUFFLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBS00sSUFBSTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFLTSxJQUFJO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUtNLElBQUk7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0QifQ==