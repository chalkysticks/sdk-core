import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Rulebook
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Rulebook extends Base<Model.Rulebook> {
	/**
	 * @type Model.Rulebook
	 */
	public model: Model.Rulebook = new Model.Rulebook();
}
