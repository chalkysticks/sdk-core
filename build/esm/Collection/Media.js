import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Media extends Base {
    constructor() {
        super(...arguments);
        this.model = new Model.Media();
    }
    get images() {
        return this.models.filter((media) => media.getType() === 'image');
    }
    get primary() {
        return this.models.at(0);
    }
    get videos() {
        return this.models.filter((media) => media.getType() === 'video');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29sbGVjdGlvbi9NZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPakMsTUFBTSxPQUFPLEtBQU0sU0FBUSxJQUFpQjtJQUE1Qzs7UUFJUSxVQUFLLEdBQWdCLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBc0IvQyxDQUFDO0lBakJBLElBQVcsTUFBTTtRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssT0FBTyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUtELElBQVcsT0FBTztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFLRCxJQUFXLE1BQU07UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDRCJ9