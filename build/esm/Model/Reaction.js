import * as Model from './index.js';
import { Base } from './Base.js';
export class Reaction extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'reactions';
        this.fields = ['user_id', 'type', 'created_at', 'updated_at'];
    }
    get user() {
        return this.hasOne('user', Model.User);
    }
    getType() {
        return this.attr('type');
    }
    getUserId() {
        return this.attr('user_id');
    }
    isLike() {
        return this.getType() === 'like';
    }
    isDislike() {
        return this.getType() === 'dislike';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvUmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9qQyxNQUFNLE9BQU8sUUFBUyxTQUFRLElBQUk7SUFBbEM7O1FBT1EsYUFBUSxHQUFXLFdBQVcsQ0FBQztRQU8vQixXQUFNLEdBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQTJDM0UsQ0FBQztJQXRDQSxJQUFXLElBQUk7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQWEsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBVU0sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQVcsQ0FBQztJQUNwQyxDQUFDO0lBS00sU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQVcsQ0FBQztJQUN2QyxDQUFDO0lBS00sTUFBTTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLE1BQU0sQ0FBQztJQUNsQyxDQUFDO0lBS00sU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0NBR0QifQ==