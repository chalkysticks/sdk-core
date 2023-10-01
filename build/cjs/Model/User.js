"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Base_1 = require("./Base");
class User extends Base_1.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'users';
        this.fields = [
            'id',
            'name',
            'slug',
            'email',
            'phone',
            'latitude',
            'longitude',
            'status',
            'permissions',
            'created_at',
            'updated_at',
        ];
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
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE4QjtBQU85QixNQUFhLElBQUssU0FBUSxXQUFJO0lBQTlCOztRQU9XLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFPM0IsV0FBTSxHQUFhO1lBQ3RCLElBQUk7WUFDSixNQUFNO1lBQ04sTUFBTTtZQUNOLE9BQU87WUFDUCxPQUFPO1lBQ1AsVUFBVTtZQUNWLFdBQVc7WUFDWCxRQUFRO1lBQ1IsYUFBYTtZQUNiLFlBQVk7WUFDWixZQUFZO1NBQ2YsQ0FBQztJQThFTixDQUFDO0lBcEVVLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDeEMsQ0FBQztJQU9NLFdBQVc7UUFDZCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBVyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQU9NLFlBQVk7UUFDZixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQU9NLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQU9NLGNBQWM7UUFDakIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFPTSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFPTSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFPTSxTQUFTO1FBQ1osT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQVcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FHSjtBQXhHRCxvQkF3R0MifQ==