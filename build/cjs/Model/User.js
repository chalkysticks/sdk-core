"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
class ModelUser extends Base_1.default {
    constructor() {
        super(...arguments);
        this.endpoint = 'user';
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
exports.default = ModelUser;
//# sourceMappingURL=User.js.map