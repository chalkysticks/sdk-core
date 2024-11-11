import { Base } from './Base';
export class Advertisement extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'ads';
        this.fields = ['caption', 'company', 'image', 'url'];
    }
    getCaption() {
        return this.attr('caption');
    }
    getCompany() {
        return this.attr('company');
    }
    getImage() {
        return this.attr('image');
    }
    getUrl() {
        return this.attr('url');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWR2ZXJ0aXNlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9BZHZlcnRpc2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFPOUIsTUFBTSxPQUFPLGFBQWMsU0FBUSxJQUFJO0lBQXZDOztRQU9RLGFBQVEsR0FBVyxLQUFLLENBQUM7UUFPekIsV0FBTSxHQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFrQ2xFLENBQUM7SUExQk8sVUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQUtNLFVBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFLTSxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFLTSxNQUFNO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDO0lBQ25DLENBQUM7Q0FHRCJ9