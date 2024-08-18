import { Event } from '../index.js';
import { Shortcut } from './Keyboard/Shortcut.js';
export class Keyboard extends Event.Dispatcher {
    constructor() {
        super(...arguments);
        this.shortcut = new Shortcut({
            ignoreInputs: true,
        });
    }
    static { this.instance = new Keyboard(); }
}
export default new Keyboard();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5Ym9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvSW5wdXQvS2V5Ym9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFPbEQsTUFBTSxPQUFPLFFBQVMsU0FBUSxLQUFLLENBQUMsVUFBVTtJQUE5Qzs7UUFTVyxhQUFRLEdBQWEsSUFBSSxRQUFRLENBQUM7WUFDM0MsWUFBWSxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQzthQVJjLGFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxBQUEzQixDQUE0Qjs7QUFXbkQsZUFBZSxJQUFJLFFBQVEsRUFBRSxDQUFDIn0=