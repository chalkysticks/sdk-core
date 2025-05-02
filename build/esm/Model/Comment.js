import * as Collection from '../Collection/index.js';
import { Base } from './Base.js';
export class Comment extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'comments';
        this.fields = ['user_id', 'body', 'parent_id', 'is_edited', 'is_flagged', 'meta', 'created_at', 'updated_at'];
    }
    get children() {
        return this.hasMany('children', Collection.Comment);
    }
    get flags() {
        return this.hasMany('flags', Collection.Base);
    }
    get parentComment() {
        return this.hasOne('parent', Comment);
    }
    get user() {
        return this.hasOne('user', Collection.User);
    }
    getBody() {
        return this.attr('body');
    }
    getParentId() {
        return this.attr('parent_id');
    }
    getUserId() {
        return this.attr('user_id');
    }
    hasChildren() {
        return this.children.length > 0;
    }
    hasParent() {
        return !!this.getParentId();
    }
    isEdited() {
        return !!this.attr('is_edited');
    }
    isFlagged() {
        return !!this.attr('is_flagged');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9qQyxNQUFNLE9BQU8sT0FBUSxTQUFRLElBQUk7SUFBakM7O1FBT1EsYUFBUSxHQUFXLFVBQVUsQ0FBQztRQU85QixXQUFNLEdBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUE0RTNILENBQUM7SUF2RUEsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBcUIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUF1QixPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFVLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFrQixNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFVTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFLTSxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQVcsQ0FBQztJQUN6QyxDQUFDO0lBS00sU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQVcsQ0FBQztJQUN2QyxDQUFDO0lBS00sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBS00sU0FBUztRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBS00sUUFBUTtRQUNkLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUtNLFNBQVM7UUFDZixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FHRCJ9