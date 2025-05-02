import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Fact
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Fact extends Base<Model.Fact> {
	/**
	 * @type Model.Fact
	 */
	public model: Model.Fact = new Model.Fact();
}
