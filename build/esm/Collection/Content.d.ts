import * as Model from '../Model';
import { Base } from './Base';
export declare class Content extends Base<Model.Content> {
    model: Model.Content;
    news(): this;
    pad(): this;
    tags(tags?: string[]): this;
    tutorials(): this;
}
