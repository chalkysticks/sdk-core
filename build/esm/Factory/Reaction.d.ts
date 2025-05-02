import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
export declare function model(options?: Record<string, any>): Model.Reaction;
export declare function collection(options?: Record<string, any>): Collection.Reaction;
export declare function createFor(entity_type: string, entity_id: number | string, type: string, options?: Record<string, any>): Model.Reaction;
export declare function like(entity_type: string, entity_id: number | string, options?: Record<string, any>): Model.Reaction;
export declare function dislike(entity_type: string, entity_id: number | string, options?: Record<string, any>): Model.Reaction;
