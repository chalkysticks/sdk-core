import * as Collection from '../Collection/index.js';
import * as YouTube from '../Utility/YouTube.js';
import { Base } from './Base.js';

/**
 * @class Content
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Content extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/content
	 *
	 * @type string
	 */
	public endpoint: string = 'content';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['title', 'media_type', 'media_url', 'thumbnail_url', 'content', 'created_at', 'updated_at'];

	// region: Relationship
	// ---------------------------------------------------------------------------

	public get comments(): Collection.Comment {
		return this.hasMany<Collection.Comment>('comments', Collection.Comment);
	}

	public get reactions(): Collection.Reaction {
		return this.hasMany<Collection.Reaction>('reactions', Collection.Reaction);
	}

	public get tags(): Collection.ContentTag {
		return this.hasMany<Collection.ContentTag>('tags', Collection.ContentTag);
	}

	// endregion: Relationship

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return string
	 */
	public getContent(): string {
		return this.attr('content') as string;
	}

	/**
	 * @return string
	 */
	public getMediaType(): string {
		return this.attr('media_type') as string;
	}

	/**
	 * @return string
	 */
	public getMediaUrl(): string {
		return this.attr('media_url') as string;
	}

	/**
	 * @return string
	 */
	public getThumbnailUrl(): string {
		return this.attr('thumbnail_url') as string;
	}

	/**
	 * @return string
	 */
	public getTitle(): string {
		return this.attr('title') as string;
	}

	/**
	 * @return string
	 */
	public getYouTubeEmbed(): string {
		if (YouTube.isYouTube(this.getMediaUrl())) {
			return YouTube.toEmbedUrl(this.getMediaUrl());
		}

		return '';
	}

	/**
	 * @return string
	 */
	public hasContent(): boolean {
		return !!this.getContent();
	}

	/**
	 * @return string
	 */
	public isImage(): boolean {
		return this.getMediaType() === 'image';
	}

	/**
	 * @return string
	 */
	public isVideo(): boolean {
		return this.getMediaType() === 'video';
	}

	// endregion: Getters

	// region: Comments & Reactions
	// ---------------------------------------------------------------------------

	/**
	 * Get count of comments
	 *
	 * @return number
	 */
	public getCommentCount(): number {
		return this.comments ? this.comments.length : 0;
	}

	/**
	 * Get root comments (without parent)
	 *
	 * @return Collection.Comment
	 */
	public getRootComments(): Collection.Comment {
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

	/**
	 * Get count of reactions by type
	 *
	 * @param string type - reaction type (like, dislike, etc.)
	 * @return number
	 */
	public getReactionCount(type?: string): number {
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

	/**
	 * Get count of likes
	 *
	 * @return number
	 */
	public getLikeCount(): number {
		return this.getReactionCount('like');
	}

	/**
	 * Get count of dislikes
	 *
	 * @return number
	 */
	public getDislikeCount(): number {
		return this.getReactionCount('dislike');
	}

	/**
	 * Check if a specific user has reacted with a type
	 *
	 * @param number|string userId
	 * @param string type
	 * @return boolean
	 */
	public hasUserReaction(userId: number | string, type?: string): boolean {
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

	/**
	 * Check if a user has liked this content
	 *
	 * @param number|string userId
	 * @return boolean
	 */
	public hasUserLike(userId: number | string): boolean {
		return this.hasUserReaction(userId, 'like');
	}

	/**
	 * Check if a user has disliked this content
	 *
	 * @param number|string userId
	 * @return boolean
	 */
	public hasUserDislike(userId: number | string): boolean {
		return this.hasUserReaction(userId, 'dislike');
	}

	// endregion: Comments & Reactions
}
