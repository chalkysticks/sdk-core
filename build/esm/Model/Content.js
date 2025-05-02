import * as Collection from '../Collection/index.js';
import * as YouTube from '../Utility/YouTube.js';
import { Base } from './Base.js';
export class Content extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'content';
        this.fields = ['title', 'media_type', 'media_url', 'thumbnail_url', 'content', 'created_at', 'updated_at'];
    }
    get comments() {
        return this.hasMany('comments', Collection.Comment);
    }
    get reactions() {
        return this.hasMany('reactions', Collection.Reaction);
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
    getCommentCount() {
        return this.comments ? this.comments.length : 0;
    }
    getRootComments() {
        if (!this.comments) {
            return new Collection.Comment();
        }
        const rootComments = new Collection.Comment();
        this.comments.models.forEach((comment) => {
            if (!comment.hasParent()) {
                rootComments.add(comment);
            }
        });
        return rootComments;
    }
    getReactionCount(type) {
        if (!this.reactions) {
            return 0;
        }
        if (!type) {
            return this.reactions.length;
        }
        let count = 0;
        this.reactions.models.forEach((reaction) => {
            if (reaction.getType() === type) {
                count++;
            }
        });
        return count;
    }
    getLikeCount() {
        return this.getReactionCount('like');
    }
    getDislikeCount() {
        return this.getReactionCount('dislike');
    }
    hasUserReaction(userId, type) {
        if (!this.reactions || !userId) {
            return false;
        }
        return this.reactions.models.some((reaction) => {
            if (reaction.getUserId() === userId) {
                return type ? reaction.getType() === type : true;
            }
            return false;
        });
    }
    hasUserLike(userId) {
        return this.hasUserReaction(userId, 'like');
    }
    hasUserDislike(userId) {
        return this.hasUserReaction(userId, 'dislike');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9Db250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxLQUFLLE9BQU8sTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBT2pDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBSTtJQUFqQzs7UUFPUSxhQUFRLEdBQVcsU0FBUyxDQUFDO1FBTzdCLFdBQU0sR0FBYSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBK014SCxDQUFDO0lBMU1BLElBQVcsUUFBUTtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQXFCLFVBQVUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELElBQVcsU0FBUztRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQXNCLFdBQVcsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBd0IsTUFBTSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBVU0sVUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFXLENBQUM7SUFDdkMsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzFDLENBQUM7SUFLTSxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQVcsQ0FBQztJQUN6QyxDQUFDO0lBS00sZUFBZTtRQUNyQixP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