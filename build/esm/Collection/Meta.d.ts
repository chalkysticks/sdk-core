import * as Model from '../Model';
import { Base } from './Base';
export declare class Meta extends Base<Model.Meta> {
    model: Model.Meta;
    getByKey(key: string): Model.Meta[];
    getByGroup(group: string): Model.Meta[];
    getKeys(): string[];
    getValues(): string[];
    getValuesByKey(key: string): string[];
    getValuesByGroup(group: string): string[];
}
