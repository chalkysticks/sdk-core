import * as Collection from '../Collection/index.js';
import { Base } from './Base.js';
export declare class Reaction extends Base {
    endpoint: string;
    fields: string[];
    get user(): Collection.User;
    getType(): string;
    getUserId(): number;
    isLike(): boolean;
    isDislike(): boolean;
}
