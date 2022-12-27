import { IAttributes, Model } from 'restmc';
export default class ModelBase extends Model {
    baseUrl: string;
    constructor(attributes?: IAttributes, options?: IAttributes);
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
}
