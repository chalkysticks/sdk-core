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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQThCO0FBTzlCLE1BQWEsSUFBSyxTQUFRLFdBQUk7SUFBOUI7O1FBT1csYUFBUSxHQUFXLE9BQU8sQ0FBQztRQU8zQixXQUFNLEdBQWE7WUFDdEIsSUFBSTtZQUNKLE1BQU07WUFDTixNQUFNO1lBQ04sT0FBTztZQUNQLE9BQU87WUFDUCxVQUFVO1lBQ1YsV0FBVztZQUNYLFFBQVE7WUFDUixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7U0FDZixDQUFDO0lBOEVOLENBQUM7SUFwRVUsUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQVcsQ0FBQztJQUN4QyxDQUFDO0lBT00sV0FBVztRQUNkLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFXLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBT00sWUFBWTtRQUNmLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFXLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBT00sT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQztJQUN2QyxDQUFDO0lBT00sY0FBYztRQUNqQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQU9NLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDeEMsQ0FBQztJQU9NLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQU9NLFNBQVM7UUFDWixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBVyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUdKO0FBeEdELG9CQXdHQyJ9