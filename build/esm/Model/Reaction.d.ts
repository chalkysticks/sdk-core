import * as Model from './index.js';
import { Base } from './Base.js';
export declare class Reaction extends Base {
    endpoint: string;
    fields: string[];
    get user(): Model.User;
    getType(): string;
    getUserId(): number;
    isLike(): boolean;
    isDislike(): boolean;
}
