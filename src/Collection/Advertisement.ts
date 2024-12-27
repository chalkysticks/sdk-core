import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Advertisement
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Advertisement extends Base<Model.Advertisement> {
	/**
	 * @type Model.Advertisement
	 */
	public model: Model.Advertisement = new Model.Advertisement();
}
