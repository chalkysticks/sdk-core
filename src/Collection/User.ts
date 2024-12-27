import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class User
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class User extends Base<Model.User> {
	/**
	 * @type Model.User
	 */
	public model: Model.User = new Model.User();
}
