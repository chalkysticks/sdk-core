import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Wallet
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Wallet extends Base<Model.Wallet> {
	/**
	 * @type Model.Wallet
	 */
	public model: Model.Wallet = new Model.Wallet();
}
