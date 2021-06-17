import Environment from '../Common/Environment';
import { Model } from 'eloquent-js';
export default class ModelBase extends Model {
    baseUrl = Environment.app.api_url;
}
//# sourceMappingURL=Base.js.map