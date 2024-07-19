import { Base } from './Base';
export class User extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'users';
        this.fields = ['id', 'name', 'slug', 'email', 'phone', 'latitude', 'longitude', 'status', 'permissions', 'created_at', 'updated_at'];
    }
    getEmail() {
        return this.attr('email');
    }
    getLatitude() {
        return parseFloat(this.attr('latitude'));
    }
    getLongitude() {
        return parseFloat(this.attr('longitude'));
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFPOUIsTUFBTSxPQUFPLElBQUssU0FBUSxJQUFJO0lBQTlCOztRQU9RLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFPM0IsV0FBTSxHQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBOEVsSixDQUFDO0lBcEVPLFFBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDckMsQ0FBQztJQU9NLFdBQVc7UUFDakIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFPTSxZQUFZO1FBQ2xCLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFXLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBT00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQztJQUNwQyxDQUFDO0lBT00sY0FBYztRQUNwQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBVyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQU9NLFFBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDckMsQ0FBQztJQU9NLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDcEMsQ0FBQztJQU9NLFNBQVM7UUFDZixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBVyxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUdEIn0=