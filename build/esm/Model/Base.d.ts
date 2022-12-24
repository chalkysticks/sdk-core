import { IAttributes, Model } from 'restmc';
export default class ModelBase extends Model {
    baseUrl: string;
    options: IAttributes;
    constructor(options?: any);
}
