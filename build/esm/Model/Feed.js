import { Base } from './Base.js';
export class Feed extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'feed';
        this.fields = ['lat', 'lon', 'type', 'created_at', 'updated_at'];
    }
    getDistance() {
        return parseFloat(this.attr('distance'));
    }
    getHtmlMessage() {
        return this.attr('html_message');
    }
    getLatitude() {
        return parseFloat(this.attr('lat'));
    }
    getLongitude() {
        return parseFloat(this.attr('lon'));
    }
    getMessage(asHtml = false) {
        return asHtml ? this.getHtmlMessage() : this.attr('plain_message');
    }
    getType() {
        return this.attr('type');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9GZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPakMsTUFBTSxPQUFPLElBQUssU0FBUSxJQUFJO0lBQTlCOztRQU9RLGFBQVEsR0FBVyxNQUFNLENBQUM7UUFPMUIsV0FBTSxHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBZ0Q5RSxDQUFDO0lBeENPLFdBQVc7UUFDakIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFLTSxjQUFjO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQVcsQ0FBQztJQUM1QyxDQUFDO0lBS00sV0FBVztRQUNqQixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQVcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFLTSxVQUFVLENBQUMsU0FBa0IsS0FBSztRQUN4QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBWSxDQUFDO0lBQ2hGLENBQUM7SUFLTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7Q0FHRCJ9