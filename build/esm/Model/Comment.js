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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9qQyxNQUFNLE9BQU8sT0FBUSxTQUFRLElBQUk7SUFBakM7O1FBT1EsYUFBUSxHQUFXLFVBQVUsQ0FBQztRQU85QixXQUFNLEdBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFpRzNILENBQUM7SUE1RkEsSUFBVyxRQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBcUIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBTUQsSUFBVyxhQUFhO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBVSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBYSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFXTSxLQUFLLENBQUMsU0FBYyxFQUFFO1FBQzVCLE9BQU8sSUFBSSxPQUFPLENBQ2pCO1lBQ0MsR0FBRyxNQUFNO1lBQ1QsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2xCLEVBQ0Q7WUFDQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7U0FDdkMsQ0FDRCxDQUFDO0lBQ0gsQ0FBQztJQVVNLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDcEMsQ0FBQztJQUtNLFdBQVc7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFLTSxTQUFTO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFLTSxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFLTSxTQUFTO1FBQ2YsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFLTSxRQUFRO1FBQ2QsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBS00sU0FBUztRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUdEIn0=