import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export declare class Reaction extends Base<Model.Reaction> {
    model: Model.Reaction;
    endpoint: string;
    forEntity(entity_type: string, entity_id: number | string): this;
    byType(type: string): this;
    likes(): this;
    dislikes(): this;
    byUser(user_id: number | string): this;
}
