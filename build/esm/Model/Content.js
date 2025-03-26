import * as Collection from '../Collection/index.js';
import * as YouTube from '../Utility/YouTube.js';
import { Base } from './Base.js';
export class Content extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'content';
        this.fields = ['title', 'media_type', 'media_url', 'thumbnail_url', 'content', 'created_at', 'updated_at'];
    }
    get tags() {
        return this.hasMany('tags', Collection.ContentTag);
    }
    getContent() {
        return this.attr('content');
    }
    getMediaType() {
        return this.attr('media_type');
    }
    getMediaUrl() {
        return this.attr('media_url');
    }
    getThumbnailUrl() {
        return this.attr('thumbnail_url');
    }
    getTitle() {
        return this.attr('title');
    }
    getYouTubeEmbed() {
        if (YouTube.isYouTube(this.getMediaUrl())) {
            return YouTube.toEmbedUrl(this.getMediaUrl());
        }
        return '';
    }
    hasContent() {
        return !!this.getContent();
    }
    isImage() {
        return this.getMediaType() === 'image';
    }
    isVideo() {
        return this.getMediaType() === 'video';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBSTtJQUFqQzs7UUFPUSxhQUFRLEdBQVcsU0FBUyxDQUFDO1FBTzdCLFdBQU0sR0FBYSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBa0Z4SCxDQUFDO0lBN0VBLElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBd0IsTUFBTSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBVU0sVUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzFDLENBQUM7SUFLTSxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQVcsQ0FBQztJQUN6QyxDQUFDO0lBS00sZUFBZTtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFXLENBQUM7SUFDN0MsQ0FBQztJQUtNLFFBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDckMsQ0FBQztJQUtNLGVBQWU7UUFDckIsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDM0MsT0FBTyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFLTSxVQUFVO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBS00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0lBS00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0NBR0QifQ==