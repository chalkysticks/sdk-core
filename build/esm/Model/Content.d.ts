import * as Collection from '../Collection/index.js';
import { Base } from './Base.js';
export declare class Content extends Base {
    endpoint: string;
    fields: string[];
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
}
