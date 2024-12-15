import { Base } from './Base';
export class Rulebook extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'rulebooks';
        this.fields = ['content'];
    }
    getContent() {
        return this.attr('content');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVsZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvUnVsZWJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQU85QixNQUFNLE9BQU8sUUFBUyxTQUFRLElBQUk7SUFBbEM7O1FBT1EsYUFBUSxHQUFXLFdBQVcsQ0FBQztRQU8vQixXQUFNLEdBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQWF2QyxDQUFDO0lBTE8sVUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDdkMsQ0FBQztDQUdEIn0=