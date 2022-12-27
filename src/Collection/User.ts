import CollectionBase from './Base';
import ModelUser from '../Model/User';

/**
 * @class CollectionUser
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export default class CollectionUser extends CollectionBase<ModelUser> {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v1/users
	 *
	 * @type string
	 */
	public endpoint: string = 'users';

	/**
	 * Model object instantiated by this collection
	 *
	 * @type ModelUser
	 */
	public model: ModelUser = new ModelUser();
}
