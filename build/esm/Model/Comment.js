import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
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
    get parentComment() {
        return this.hasOne('parent', Comment);
    }
    get user() {
        return this.hasOne('user', Model.User);
    }
    reply(params = {}) {
        return new Comment({
            ...params,
            parent_id: this.id,
        }, {
            token: this.token || this.options.token,
        });
    }
    getBody() {
        return this.attr('body');
    }
    getParentCommentId() {
        return this.attr('parent_id');
    }
    getUserId() {
        return this.attr('user_id');
    }
    hasChildren() {
        return this.children.length > 0;
    }
    hasParentComment() {
        return !!this.getParentCommentId();
    }
    isEdited() {
        return !!this.attr('is_edited');
    }
    isFlagged() {
        return !!this.attr('is_flagged');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9qQyxNQUFNLE9BQU8sT0FBUSxTQUFRLElBQUk7SUFBakM7O1FBT1EsYUFBUSxHQUFXLFVBQVUsQ0FBQztRQU85QixXQUFNLEdBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFtRzNILENBQUM7SUE5RkEsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBcUIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBTUQsSUFBVyxhQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBVSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBYSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFXTSxLQUFLLENBQUMsU0FBYyxFQUFFO1FBQzVCLE9BQU8sSUFBSSxPQUFPLENBQ2pCO1lBQ0MsR0FBRyxNQUFNO1lBQ1QsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2xCLEVBQ0Q7WUFDQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7U0FDdkMsQ0FDRCxDQUFDO0lBQ0gsQ0FBQztJQVVNLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDcEMsQ0FBQztJQUtNLGtCQUFrQjtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFXLENBQUM7SUFDekMsQ0FBQztJQUtNLFNBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQUtNLFdBQVc7UUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQU9NLGdCQUFnQjtRQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBS00sUUFBUTtRQUNkLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUtNLFNBQVM7UUFDZixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FHRCJ9