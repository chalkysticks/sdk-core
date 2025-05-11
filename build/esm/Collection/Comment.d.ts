import * as Model from '../Model/index.js';
import { Base } from './Base.js';
import { IAttributes, IDispatcherEvent } from 'restmc';
export declare class Comment extends Base<Model.Comment> {
    model: Model.Comment;
    constructor(options?: IAttributes);
    attachEvents(): void;
    detachEvents(): void;
    forEntity(entity_type: string, entity_id: number | string): this;
    rootOnly(): this;
    byParent(parent_id: number | string): this;
    byUser(owner_id: number | string): this;
    comment(params?: any): Model.Comment;
    protected Handle_OnAddBeforeSetParentId(e: IDispatcherEvent): Promise<void>;
}
