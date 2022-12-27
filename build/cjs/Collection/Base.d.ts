import { Collection, IAttributes, Model } from 'restmc';
export default class Base<T extends Model> extends Collection<T> {
    model: any;
    baseUrl: string;
    limit: number;
    options: IAttributes;
    constructor(options?: any);
    isV1(): boolean;
    isV2(): boolean;
    isV3(): boolean;
}
