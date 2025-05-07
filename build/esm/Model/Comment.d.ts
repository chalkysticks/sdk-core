import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';
export declare class Comment extends Base {
    endpoint: string;
    fields: string[];
    get children(): Collection.Comment;
    get parentComment(): Comment;
    get user(): Model.User;
    reply(params?: any): Comment;
    getBody(): string;
    getParentCommentId(): number;
    getUserId(): number;
    hasChildren(): boolean;
    hasParentComment(): boolean;
    isEdited(): boolean;
    isFlagged(): boolean;
}
