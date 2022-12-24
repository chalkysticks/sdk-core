import CollectionBase from './Base';
import ModelUser from '../Model/User';
export default class CollectionUser extends CollectionBase<ModelUser> {
    endpoint: string;
    model: ModelUser;
}
