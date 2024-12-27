import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export declare class ContentTag extends Base<Model.ContentTag> {
    model: Model.ContentTag;
    getByTag(tag: string): Model.ContentTag[];
}
