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
//# sourceMappingURL=User.js.map