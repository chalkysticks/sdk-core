import * as Collection from '../Collection/index.js';
import * as Utility from '../Utility/index.js';
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

	public get tags(): Collection.ContentTag {
		return this.hasMany('tags', Collection.ContentTag);
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
		if (Utility.YouTube.isYouTube(this.getMediaUrl())) {
			return Utility.YouTube.toEmbedUrl(this.getMediaUrl());
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
}
