import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Content extends Base {
    constructor() {
        super(...arguments);
        this.model = new Model.Content();
    }
    news() {
        return this.tags(['news']);
    }
    pad() {
        return this.tags(['pad']);
    }
    tags(tags = []) {
        this.setQueryParam('tags', tags.join(','));
        return this;
    }
    tutorials() {
        return this.tags(['tutorial']);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Db2xsZWN0aW9uL0NvbnRlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBbUI7SUFBaEQ7O1FBSVEsVUFBSyxHQUFrQixJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQWdDbkQsQ0FBQztJQTNCTyxJQUFJO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBS00sR0FBRztRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQU1NLElBQUksQ0FBQyxPQUFpQixFQUFFO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUzQyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFLTSxTQUFTO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0QifQ==