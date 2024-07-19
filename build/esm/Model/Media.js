import { Base } from './Base';
export class Media extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'media';
        this.fields = ['id', 'type', 'url', 'created_at', 'updated_at'];
    }
    getType() {
        return this.attr('type');
    }
    getUrl() {
        return this.attr('url');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvTWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQU85QixNQUFNLE9BQU8sS0FBTSxTQUFRLElBQUk7SUFBL0I7O1FBT1EsYUFBUSxHQUFXLE9BQU8sQ0FBQztRQU8zQixXQUFNLEdBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFvQjdFLENBQUM7SUFaTyxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFLTSxNQUFNO1FBQ1osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBVyxDQUFDO0lBQ25DLENBQUM7Q0FHRCJ9