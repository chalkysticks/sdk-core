import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';
export class User extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'users';
        this.fields = ['id', 'lat', 'lon', 'name', 'phone', 'slug', 'status', 'wallet_balance', 'created_at', 'updated_at'];
    }
    get avatar() {
        return this.media.primary || new Model.Media();
    }
    get games() {
        return this.hasMany('games', Collection.Meta);
    }
    get lastCollection() {
        return this.hasOne('last_collection', Model.Wallet);
    }
    get media() {
        const mediaCollection = this.hasMany('media', Collection.Media);
        mediaCollection.useModifiedEndpoint(this);
        return mediaCollection;
    }
    get metadata() {
        return this.hasMany('meta', Collection.Meta);
    }
    getLatitude() {
        return parseFloat(this.attr('lat'));
    }
    getLongitude() {
        return parseFloat(this.attr('lon'));
    }
    getName() {
        return this.attr('name');
    }
    getPermissions() {
        return parseFloat(this.attr('permissions'));
    }
    getPhone() {
        return this.attr('phone');
    }
    getSlug() {
        return this.attr('slug');
    }
    getStatus() {
        return parseFloat(this.attr('status'));
    }
    getWalletBalance() {
        return parseFloat(this.attr('wallet_balance'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9qQyxNQUFNLE9BQU8sSUFBSyxTQUFRLElBQUk7SUFBOUI7O1FBT1EsYUFBUSxHQUFXLE9BQU8sQ0FBQztRQU8zQixXQUFNLEdBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBMEdqSSxDQUFDO0lBckdBLElBQVcsTUFBTTtRQUNoQixPQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBdUIsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFrQixPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxJQUFXLGNBQWM7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFlLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2YsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBbUIsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRixlQUFlLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUMsT0FBTyxlQUFlLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQWtCLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQVlNLFdBQVc7UUFDakIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFPTSxZQUFZO1FBQ2xCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFXLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBT00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQztJQUNwQyxDQUFDO0lBT00sY0FBYztRQUNwQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBVyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQU9NLFFBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDckMsQ0FBQztJQU9NLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDcEMsQ0FBQztJQU9NLFNBQVM7UUFDZixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQU9NLGdCQUFnQjtRQUN0QixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFXLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBR0QifQ==