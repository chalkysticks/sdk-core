import * as Collection from '../Collection';
import * as Model from '.';
import { Base } from './Base';
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
        return this.hasMany('media', Collection.Media);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sS0FBSyxLQUFLLE1BQU0sR0FBRyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFPOUIsTUFBTSxPQUFPLElBQUssU0FBUSxJQUFJO0lBQTlCOztRQU9RLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFPM0IsV0FBTSxHQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQXVHakksQ0FBQztJQWxHQSxJQUFXLE1BQU07UUFDaEIsT0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQXVCLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVELElBQVcsS0FBSztRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFXLGNBQWM7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBWU0sV0FBVztRQUNqQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQU9NLFlBQVk7UUFDbEIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFPTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFPTSxjQUFjO1FBQ3BCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBT00sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQVcsQ0FBQztJQUNyQyxDQUFDO0lBT00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQztJQUNwQyxDQUFDO0lBT00sU0FBUztRQUNmLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBT00sZ0JBQWdCO1FBQ3RCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FHRCJ9