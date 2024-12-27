import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Statistic
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Statistic extends Base<Model.Statistic> {
	/**
	 * @type Model.Statistic
	 */
	public model: Model.Statistic = new Model.Statistic();
}
