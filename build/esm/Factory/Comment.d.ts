import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
export declare function model(options?: Record<string, any>): Model.Comment;
export declare function collection(options?: Record<string, any>): Collection.Comment;
export declare function createFor(entity_type: string, entity_id: number | string, body: string, options?: Record<string, any>): Model.Comment;
export declare function createReply(parent_id: number | string, body: string, options?: Record<string, any>): Model.Comment;
