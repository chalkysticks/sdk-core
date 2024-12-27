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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9qQyxNQUFNLE9BQU8sSUFBSyxTQUFRLElBQUk7SUFBOUI7O1FBT1EsYUFBUSxHQUFXLE9BQU8sQ0FBQztRQU8zQixXQUFNLEdBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBdUdqSSxDQUFDO0lBbEdBLElBQVcsTUFBTTtRQUNoQixPQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBdUIsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELElBQVcsY0FBYztRQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFXLEtBQUs7UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFZTSxXQUFXO1FBQ2pCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFXLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBT00sWUFBWTtRQUNsQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQU9NLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDcEMsQ0FBQztJQU9NLGNBQWM7UUFDcEIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQVcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFPTSxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFPTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFPTSxTQUFTO1FBQ2YsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFPTSxnQkFBZ0I7UUFDdEIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUdEIn0=