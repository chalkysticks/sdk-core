import CollectionBase from './Base';
import ModelUser from '../Model/User';
export default class CollectionUser extends CollectionBase {
    endpoint = 'user';
    model = new ModelUser();
}
//# sourceMappingURL=User.js.map