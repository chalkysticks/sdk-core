import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Reaction extends Base {
    constructor() {
        super(...arguments);
        this.model = Model.Reaction;
        this.endpoint = 'reactions';
    }
    forEntity(entity_type, entity_id) {
        this.builder.qp('entity_type', entity_type);
        this.builder.qp('entity_id', entity_id);
        return this;
    }
    byType(type) {
        this.builder.qp('type', type);
        return this;
    }
    likes() {
        return this.byType('like');
    }
    dislikes() {
        return this.byType('dislike');
    }
    byUser(user_id) {
        this.builder.qp('user_id', user_id);
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29sbGVjdGlvbi9SZWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPakMsTUFBTSxPQUFPLFFBQVMsU0FBUSxJQUFvQjtJQUFsRDs7UUFNUSxVQUFLLEdBQVEsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQVE1QixhQUFRLEdBQVcsV0FBVyxDQUFDO0lBb0R2QyxDQUFDO0lBN0NPLFNBQVMsQ0FBQyxXQUFtQixFQUFFLFNBQTBCO1FBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBUU0sTUFBTSxDQUFDLElBQVk7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQU9NLEtBQUs7UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQU9NLFFBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQVFNLE1BQU0sQ0FBQyxPQUF3QjtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0QifQ==