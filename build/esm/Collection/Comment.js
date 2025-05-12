import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Comment extends Base {
    constructor(options = {}) {
        super(options, false);
        this.model = new Model.Comment();
        this.Handle_OnAddAfterSetParentId = this.Handle_OnAddAfterSetParentId.bind(this);
        this.setup(options);
    }
    attachEvents() {
        super.attachEvents();
        this.on('add:after', this.Handle_OnAddAfterSetParentId);
    }
    detachEvents() {
        super.detachEvents();
        this.off('add:after', this.Handle_OnAddAfterSetParentId);
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
    byUser(owner_id) {
        this.builder.qp('owner_id', owner_id);
        return this;
    }
    comment(params = {}) {
        this.ensureToken(this.token || this.options.token);
        this.add(params);
        return this.last();
    }
    async setEntity(commentModel) {
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
    async Handle_OnAddAfterSetParentId(e) {
        this.setEntity(e.detail.model);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUWpDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBbUI7SUFnQi9DLFlBQVksVUFBdUIsRUFBRTtRQUNwQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBWGhCLFVBQUssR0FBa0IsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFjakQsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBS00sWUFBWTtRQUNsQixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUtNLFlBQVk7UUFDbEIsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFPTSxTQUFTLENBQUMsV0FBbUIsRUFBRSxTQUEwQjtRQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQU9NLFFBQVE7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBUU0sUUFBUSxDQUFDLFNBQTBCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFRTSxNQUFNLENBQUMsUUFBeUI7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQVNNLE9BQU8sQ0FBQyxTQUFjLEVBQUU7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQW1CLENBQUM7SUFDckMsQ0FBQztJQWVTLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBMkI7UUFDcEQsTUFBTSxjQUFjLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1FBQzdELElBQUksVUFBVSxHQUFHLGNBQWMsSUFBSSxTQUFTLENBQUM7UUFFN0MsUUFBUSxjQUFjLEVBQUUsQ0FBQztZQUN4QixLQUFLLFFBQVE7Z0JBQ1osVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDckIsTUFBTTtZQUVQLEtBQUssT0FBTztnQkFDWCxVQUFVLEdBQUcsTUFBTSxDQUFDO2dCQUNwQixNQUFNO1lBRVAsS0FBSyxPQUFPO2dCQUNYLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLE1BQU07UUFDUixDQUFDO1FBRUQsWUFBWSxDQUFDLEdBQUcsQ0FBQztZQUNoQixTQUFTLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMxQyxXQUFXLEVBQUUsVUFBVTtTQUN2QixDQUFDLENBQUM7UUFHSCxZQUFZLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBTVMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQW1CO1FBQy9ELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBR0QifQ==