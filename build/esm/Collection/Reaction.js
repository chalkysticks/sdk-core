import * as Enum from '../Enum/index.js';
import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export class Reaction extends Base {
    constructor() {
        super(...arguments);
        this.model = new Model.Reaction();
        this.endpoint = 'reactions';
    }
    get angry() {
        return this.where({ type: Enum.ReactionType.Angry });
    }
    get dislike() {
        return this.where({ type: Enum.ReactionType.Dislike });
    }
    get laugh() {
        return this.where({ type: Enum.ReactionType.Laugh });
    }
    get like() {
        return this.where({ type: Enum.ReactionType.Like });
    }
    get sad() {
        return this.where({ type: Enum.ReactionType.Sad });
    }
    get wow() {
        return this.where({ type: Enum.ReactionType.Wow });
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
    byUser(user_id) {
        this.builder.qp('user_id', user_id);
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29sbGVjdGlvbi9SZWFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssSUFBSSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sS0FBSyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU9qQyxNQUFNLE9BQU8sUUFBUyxTQUFRLElBQW9CO0lBQWxEOztRQU1RLFVBQUssR0FBbUIsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFRN0MsYUFBUSxHQUFXLFdBQVcsQ0FBQztJQWtHdkMsQ0FBQztJQXhGQSxJQUFXLEtBQUs7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBYSxDQUFDO0lBQ2xFLENBQUM7SUFPRCxJQUFXLE9BQU87UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQWEsQ0FBQztJQUNwRSxDQUFDO0lBT0QsSUFBVyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQWEsQ0FBQztJQUNsRSxDQUFDO0lBT0QsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQWEsQ0FBQztJQUNqRSxDQUFDO0lBT0QsSUFBVyxHQUFHO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQWEsQ0FBQztJQUNoRSxDQUFDO0lBT0QsSUFBVyxHQUFHO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQWEsQ0FBQztJQUNoRSxDQUFDO0lBWU0sU0FBUyxDQUFDLFdBQW1CLEVBQUUsU0FBMEI7UUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFRTSxNQUFNLENBQUMsSUFBWTtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBUU0sTUFBTSxDQUFDLE9BQXdCO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Q0FHRCJ9