import * as Collection from '../Collection/index.js';
import * as Utility from '../Utility/index.js';
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
        if (Utility.YouTube.isYouTube(this.getMediaUrl())) {
            return Utility.YouTube.toEmbedUrl(this.getMediaUrl());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLE9BQU8sTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBSTtJQUFqQzs7UUFPUSxhQUFRLEdBQVcsU0FBUyxDQUFDO1FBTzdCLFdBQU0sR0FBYSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBa0Z4SCxDQUFDO0lBN0VBLElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFVTSxVQUFVO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQVcsQ0FBQztJQUN2QyxDQUFDO0lBS00sWUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFXLENBQUM7SUFDMUMsQ0FBQztJQUtNLFdBQVc7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFLTSxlQUFlO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQVcsQ0FBQztJQUM3QyxDQUFDO0lBS00sUUFBUTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQVcsQ0FBQztJQUNyQyxDQUFDO0lBS00sZUFBZTtRQUNyQixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDbkQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBS00sVUFBVTtRQUNoQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUtNLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxPQUFPLENBQUM7SUFDeEMsQ0FBQztJQUtNLE9BQU87UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxPQUFPLENBQUM7SUFDeEMsQ0FBQztDQUdEIn0=