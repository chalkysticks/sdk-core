import CollectionBase from './Base';
import ModelUser from '../Model/User';
/**
 * @class CollectionUser
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export default class CollectionUser extends CollectionBase {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v1/users
     *
     * @type string
     */
    endpoint = 'users';
    /**
     * Model object instantiated by this collection
     *
     * @type ModelUser
     */
    model = new ModelUser();
}
