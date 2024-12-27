import * as Collection from '../Collection';
import { Base } from './Base';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFPOUIsTUFBTSxPQUFPLE9BQVEsU0FBUSxJQUFJO0lBQWpDOztRQU9RLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFPN0IsV0FBTSxHQUFhLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUF1RXhILENBQUM7SUFsRUEsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQVVNLFVBQVU7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFLTSxZQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQVcsQ0FBQztJQUMxQyxDQUFDO0lBS00sV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFXLENBQUM7SUFDekMsQ0FBQztJQUtNLGVBQWU7UUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBVyxDQUFDO0lBQzdDLENBQUM7SUFLTSxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFLTSxVQUFVO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBS00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0lBS00sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLE9BQU8sQ0FBQztJQUN4QyxDQUFDO0NBR0QifQ==