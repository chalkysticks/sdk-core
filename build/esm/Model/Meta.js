import { Base } from './Base.js';
export class Meta extends Base {
    constructor() {
        super(...arguments);
        this.fields = ['id', 'group', 'key', 'value', 'created_at', 'updated_at'];
    }
    getGroup() {
        return this.attr('group');
    }
    getKey() {
        return this.attr('key');
    }
    getValue() {
        return this.attr('value');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9NZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPakMsTUFBTSxPQUFPLElBQUssU0FBUSxJQUFJO0lBQTlCOztRQU1RLFdBQU0sR0FBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUEyQnZGLENBQUM7SUFuQk8sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQVcsQ0FBQztJQUNyQyxDQUFDO0lBS00sTUFBTTtRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVcsQ0FBQztJQUNuQyxDQUFDO0lBS00sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQVcsQ0FBQztJQUNyQyxDQUFDO0NBR0QifQ==