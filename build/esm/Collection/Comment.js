import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Comment extends Base {
    constructor(options = {}) {
        super(options, false);
        this.model = new Model.Comment();
        this.Handle_OnAddBeforeSetParentId = this.Handle_OnAddBeforeSetParentId.bind(this);
        this.setup(options);
    }
    attachEvents() {
        super.attachEvents();
        this.on('add:before', this.Handle_OnAddBeforeSetParentId);
    }
    detachEvents() {
        super.detachEvents();
        this.off('add:before', this.Handle_OnAddBeforeSetParentId);
    }
    forEntity(entity_type, entity_id) {
        this.builder.qp('entity_type', entity_type);
        this.builder.qp('entity_id', entity_id);
        return this;
    }
    rootOnly() {
        this.builder.qp('parent_id', 'null');
        return this;
    }
    byParent(parent_id) {
        this.builder.qp('parent_id', parent_id);
        return this;
    }
    byUser(user_id) {
        this.builder.qp('user_id', user_id);
        return this;
    }
    comment(params = {}) {
        this.ensureToken(this.token || this.options.token);
        this.add(params);
        return this.last();
    }
    async Handle_OnAddBeforeSetParentId(e) {
        const commentModel = e.detail.model;
        const parentEndpoint = commentModel.parent?.parent?.endpoint;
        let entityType = parentEndpoint || 'content';
        switch (parentEndpoint) {
            case 'venues':
                entityType = 'venue';
                break;
            case 'users':
                entityType = 'user';
                break;
            case 'facts':
                entityType = 'fact';
                break;
        }
        commentModel.set({
            entity_id: commentModel.parent?.parent?.id,
            entity_type: entityType,
        });
        commentModel.cancelModifiedEndpoint();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUWpDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBbUI7SUFnQi9DLFlBQVksVUFBdUIsRUFBRTtRQUNwQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBWGhCLFVBQUssR0FBa0IsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFjakQsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHbkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBS00sWUFBWTtRQUNsQixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUtNLFlBQVk7UUFDbEIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFPTSxTQUFTLENBQUMsV0FBbUIsRUFBRSxTQUEwQjtRQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQU9NLFFBQVE7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBUU0sUUFBUSxDQUFDLFNBQTBCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFRTSxNQUFNLENBQUMsT0FBd0I7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXBDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQVNNLE9BQU8sQ0FBQyxTQUFjLEVBQUU7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQW1CLENBQUM7SUFDckMsQ0FBQztJQWVTLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFtQjtRQUNoRSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQXNCLENBQUM7UUFDckQsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1FBQzdELElBQUksVUFBVSxHQUFHLGNBQWMsSUFBSSxTQUFTLENBQUM7UUFFN0MsUUFBUSxjQUFjLEVBQUUsQ0FBQztZQUN4QixLQUFLLFFBQVE7Z0JBQ1osVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDckIsTUFBTTtZQUVQLEtBQUssT0FBTztnQkFDWCxVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUNwQixNQUFNO1lBRVAsS0FBSyxPQUFPO2dCQUNYLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLE1BQU07UUFDUixDQUFDO1FBRUQsWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUNoQixTQUFTLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxQyxXQUFXLEVBQUUsVUFBVTtTQUN2QixDQUFDLENBQUM7UUFHSCxZQUFZLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBR0QifQ==