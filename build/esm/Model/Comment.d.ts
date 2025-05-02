import * as Collection from '../Collection/index.js';
import { Base } from './Base.js';
export declare class Comment extends Base {
    endpoint: string;
    fields: string[];
    get children(): Collection.Comment;
    get flags(): Collection.Base<any>;
    get parentComment(): Comment;
    get user(): Collection.User;
    getBody(): string;
    getParentId(): number;
    getUserId(): number;
    hasChildren(): boolean;
    hasParent(): boolean;
    isEdited(): boolean;
    isFlagged(): boolean;
}
