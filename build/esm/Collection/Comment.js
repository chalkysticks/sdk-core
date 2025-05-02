import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Comment extends Base {
    constructor() {
        super(...arguments);
        this.model = new Model.Comment();
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBbUI7SUFBaEQ7O1FBTVEsVUFBSyxHQUFrQixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQWdEbkQsQ0FBQztJQXpDTyxTQUFTLENBQUMsV0FBbUIsRUFBRSxTQUEwQjtRQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXhDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQU9NLFFBQVE7UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFckMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBUU0sUUFBUSxDQUFDLFNBQTBCO1FBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV4QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFRTSxNQUFNLENBQUMsT0FBd0I7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXBDLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztDQUNEIn0=