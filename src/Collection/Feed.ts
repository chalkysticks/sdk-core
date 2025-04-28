import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Feed
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Feed extends Base<Model.Feed> {
	/**
	 * @type Model.Feed
	 */
	public model: Model.Feed = new Model.Feed();
}
