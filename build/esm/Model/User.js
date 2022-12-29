import ModelBase from './Base';
/**
 * @class ModelUser
 * @package Model
 * @project ChalkySticks SDK Core
 */
export default class ModelUser extends ModelBase {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v3/users
     *
     * @type string
     */
    endpoint = 'users';
    /**
     * List of fields available
     *
     * @type string[]
     */
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
    // region: Getters
    // ---------------------------------------------------------------------------
    /**
     * Retrieve User's email
     *
     * @return string
     */
    getEmail() {
        return this.attr('email');
    }
    /**
     * Retrieve User's Latitude
     *
     * @return number
     */
    getLatitude() {
        return parseFloat(this.attr('latitude'));
    }
    /**
     * Retrieve User's Longitude
     *
     * @return number
     */
    getLongitude() {
        return parseFloat(this.attr('longitude'));
    }
    /**
     * Retrieve User's name
     *
     * @return string
     */
    getName() {
        return this.attr('name');
    }
    /**
     * Retrieve User's permissions
     *
     * @return string
     */
    getPermissions() {
        return parseFloat(this.attr('permissions'));
    }
    /**
     * Retrieve User's phone number
     *
     * @return string
     */
    getPhone() {
        return this.attr('phone');
    }
    /**
     * Retrieve User's slug
     *
     * @return string
     */
    getSlug() {
        return this.attr('slug');
    }
    /**
     * Retrieve User's status
     *
     * @return string
     */
    getStatus() {
        return parseFloat(this.attr('status'));
    }
}
