import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export declare class Comment extends Base<Model.Comment> {
    model: Model.Comment;
    forEntity(entity_type: string, entity_id: number | string): this;
    rootOnly(): this;
    byParent(parent_id: number | string): this;
    byUser(user_id: number | string): this;
}
