import * as Model from '../Model';
import { Base } from './Base';

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
