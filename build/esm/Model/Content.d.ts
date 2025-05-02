import * as Collection from '../Collection/index.js';
import { Base } from './Base.js';
export declare class Content extends Base {
    endpoint: string;
    fields: string[];
    get comments(): Collection.Comment;
    get reactions(): Collection.Reaction;
    get tags(): Collection.ContentTag;
    getContent(): string;
    getMediaType(): string;
    getMediaUrl(): string;
    getThumbnailUrl(): string;
    getTitle(): string;
    getYouTubeEmbed(): string;
    hasContent(): boolean;
    isImage(): boolean;
    isVideo(): boolean;
    getCommentCount(): number;
    getRootComments(): Collection.Comment;
    getReactionCount(type?: string): number;
    getLikeCount(): number;
    getDislikeCount(): number;
    hasUserReaction(userId: number | string, type?: string): boolean;
    hasUserLike(userId: number | string): boolean;
    hasUserDislike(userId: number | string): boolean;
}
