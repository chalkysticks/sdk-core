import * as Model from '../Model';
import { Base } from './Base';
export declare class ContentTag extends Base<Model.ContentTag> {
    model: Model.ContentTag;
    getByTag(tag: string): Model.ContentTag[];
}
