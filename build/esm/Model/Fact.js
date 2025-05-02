import { Base } from './Base.js';
export class Fact extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'facts';
        this.fields = ['content'];
    }
    getContext() {
        return this.attr('context');
    }
    getFact() {
        return this.attr('fact');
    }
    getSource() {
        return this.attr('source');
    }
    isValidated() {
        return !!this.attr('validated');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9GYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPakMsTUFBTSxPQUFPLElBQUssU0FBUSxJQUFJO0lBQTlCOztRQU9RLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFPM0IsV0FBTSxHQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFrQ3ZDLENBQUM7SUExQk8sVUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQUtNLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDcEMsQ0FBQztJQUtNLFNBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFXLENBQUM7SUFDdEMsQ0FBQztJQUtNLFdBQVc7UUFDakIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBR0QifQ==