import * as Model from '../Model';
import { Base } from './Base';

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
