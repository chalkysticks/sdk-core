import * as Model from '../Model';
import { Base } from './Base';

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
