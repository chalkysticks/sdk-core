import * as Collection from '../Collection';
import { Base } from './Base';
export declare class Content extends Base {
    endpoint: string;
    fields: string[];
    get tags(): Collection.ContentTag;
    getContent(): string;
    getMediaType(): string;
    getMediaUrl(): string;
    getThumbnailUrl(): string;
    getTitle(): string;
    hasContent(): boolean;
    isImage(): boolean;
    isVideo(): boolean;
}
