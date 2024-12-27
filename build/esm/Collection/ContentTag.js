import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class ContentTag extends Base {
    constructor() {
        super(...arguments);
        this.model = new Model.ContentTag();
    }
    getByTag(tag) {
        return this.models.filter((contentTag) => contentTag.getTag() === tag);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudFRhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0NvbnRlbnRUYWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxVQUFXLFNBQVEsSUFBc0I7SUFBdEQ7O1FBSVEsVUFBSyxHQUFxQixJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQVN6RCxDQUFDO0lBSE8sUUFBUSxDQUFDLEdBQVc7UUFDMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDRCJ9