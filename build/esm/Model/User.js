import ModelBase from './Base';
export default class ModelUser extends ModelBase {
    endpoint = 'users';
    fields = [
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
//# sourceMappingURL=User.js.map