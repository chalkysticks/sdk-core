import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Comment extends Base {
    constructor(options = {}) {
        super(options);
        this.model = new Model.Comment();
        this.Handle_OnAddBeforeSetParentId = this.Handle_OnAddBeforeSetParentId.bind(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBUWpDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBbUI7SUFnQi9DLFlBQVksVUFBdUIsRUFBRTtRQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFYVCxVQUFLLEdBQWtCLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBY2pELElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFLTSxZQUFZO1FBQ2xCLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBS00sWUFBWTtRQUNsQixLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQU9NLFNBQVMsQ0FBQyxXQUFtQixFQUFFLFNBQTBCO1FBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFeEMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBT00sUUFBUTtRQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyQyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFRTSxRQUFRLENBQUMsU0FBMEI7UUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQVFNLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFcEMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBU1MsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQW1CO1FBQ2hFLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBc0IsQ0FBQztRQUNyRCxNQUFNLGNBQWMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7UUFDN0QsSUFBSSxVQUFVLEdBQUcsY0FBYyxJQUFJLFNBQVMsQ0FBQztRQUU3QyxRQUFRLGNBQWMsRUFBRSxDQUFDO1lBQ3hCLEtBQUssUUFBUTtnQkFDWixVQUFVLEdBQUcsT0FBTyxDQUFDO2dCQUNyQixNQUFNO1lBRVAsS0FBSyxPQUFPO2dCQUNYLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQ3BCLE1BQU07WUFFUCxLQUFLLE9BQU87Z0JBQ1gsVUFBVSxHQUFHLE1BQU0sQ0FBQztnQkFDcEIsTUFBTTtRQUNSLENBQUM7UUFFRCxZQUFZLENBQUMsR0FBRyxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzFDLFdBQVcsRUFBRSxVQUFVO1NBQ3ZCLENBQUMsQ0FBQztRQUdILFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Q0FHRCJ9