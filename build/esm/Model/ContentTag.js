import { Base } from './Base.js';
export class ContentTag extends Base {
    constructor() {
        super(...arguments);
        this.fields = ['content_id', 'tag'];
    }
    getTag() {
        return this.attr('tag');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudFRhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db250ZW50VGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPakMsTUFBTSxPQUFPLFVBQVcsU0FBUSxJQUFJO0lBQXBDOztRQU1RLFdBQU0sR0FBYSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQWFqRCxDQUFDO0lBTE8sTUFBTTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVcsQ0FBQztJQUNuQyxDQUFDO0NBR0QifQ==