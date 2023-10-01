import Constants from '../Common/Constants';
import Environment from '../Common/Environment';
import EventDispatcher from '../Common/EventDispatcher';
import StoreProvider from '../Provider/Store';
import { Collection, } from 'restmc';
export class Base extends Collection {
    constructor(options = {}) {
        super(options);
        this.baseUrl = Environment.app.api_url;
        this.limit = Environment.app.limit;
        this.baseUrl = options.baseUrl || this.baseUrl || Environment.app.api_url || Constants.API_URL;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0scUJBQXFCLENBQUM7QUFDNUMsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxlQUFlLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxFQUNOLFVBQVUsR0FHVixNQUFNLFFBQVEsQ0FBQztBQU9oQixNQUFNLE9BQU8sSUFBc0IsU0FBUSxVQUFhO0lBbUJ2RCxZQUFZLFVBQWUsRUFBRTtRQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFYTixZQUFPLEdBQVcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFLMUMsVUFBSyxHQUFXLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBUy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFHL0YsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNmLGVBQWUsRUFBRSxLQUFLO1NBQ3RCLENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBR3RDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUduQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7YUFDSSxJQUFJLGFBQWEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztRQUdELElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBbUIsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sTUFBTSxHQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7WUFHMUQsSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUNuQixlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2FBQ3hEO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNyRDtpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDdkQ7aUJBQ0ksSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUN4QixlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQzFEO2lCQUNJLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNwRDtpQkFDSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDL0Q7WUFHRCxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ2hELFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRO2dCQUNwQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixVQUFVLEVBQUUsWUFBWTthQUN4QixDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFLTSxJQUFJO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUtNLElBQUk7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBS00sSUFBSTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRCJ9