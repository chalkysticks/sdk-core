import * as Model from '../Model/index.js';
import { Base } from './Base.js';
export declare class Content extends Base<Model.Content> {
    model: Model.Content;
    news(): this;
    pad(): this;
    tags(tags?: string[]): this;
    tutorials(): this;
}
