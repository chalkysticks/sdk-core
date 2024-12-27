import * as Model from '../Model';
import { Base } from './Base';
export class ContentTag extends Base {
    constructor() {
        super(...arguments);
        this.model = new Model.ContentTag();
    }
    getByTag(tag) {
        return this.models.filter((contentTag) => contentTag.getTag() === tag);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudFRhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0NvbnRlbnRUYWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQU85QixNQUFNLE9BQU8sVUFBVyxTQUFRLElBQXNCO0lBQXREOztRQUlRLFVBQUssR0FBcUIsSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7SUFTekQsQ0FBQztJQUhPLFFBQVEsQ0FBQyxHQUFXO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0QifQ==