import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export declare class Reaction extends Base<Model.Reaction> {
    model: Model.Reaction;
    endpoint: string;
    get angry(): Reaction;
    get dislike(): Reaction;
    get laugh(): Reaction;
    get like(): Reaction;
    get sad(): Reaction;
    get wow(): Reaction;
    forEntity(entity_type: string, entity_id: number | string): this;
    byType(type: string): this;
    byUser(user_id: number | string): this;
}
