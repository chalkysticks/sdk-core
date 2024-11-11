import * as Model from '../Model';
import { Base } from './Base';

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
