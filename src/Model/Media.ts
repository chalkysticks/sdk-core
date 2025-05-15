import * as Collection from '../Collection/index.js';
import { Base } from './Base.js';

/**
 * @type interface
 */
interface IThumborOptions {
	fitIn?: boolean;
	height?: number;
	smart?: boolean;
	width?: number;
	filters?: {
		blur?: number;
		brightness?: number;
		contrast?: number;
		format?: 'webp' | 'jpeg' | 'png';
		grayscale?: boolean;
		quality?: number;
		watermark?: {
			image: string;
			x: number;
			y: number;
			transparency?: number;
		};
	};
}

/**
 * @class Media
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Media extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/media
	 *
	 * @type string
	 */
	public endpoint: string = 'media';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['id', 'type', 'url', 'group', 'subgroup', 'created_at', 'updated_at'];

	/**
	 * @type string
	 */
	protected proxyUrl: string = 'https://d2k0n0ggvekdpx.cloudfront.net';

	// region: Relationship
	// ---------------------------------------------------------------------------

	public get comments(): Collection.Comment {
		return this.hasMany<Collection.Comment>('comments', Collection.Comment);
	}

	public get reactions(): Collection.Reaction {
		return this.hasMany<Collection.Reaction>('reactions', Collection.Reaction);
	}

	// endregion: Relationship

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return string
	 */
	public getGroup(): string {
		return this.attr('group') as string;
	}

	/**
	 * @return string
	 */
	public getSubgroup(): string {
		return this.attr('subgroup') as string;
	}

	/**
	 * Examples:
	 *
	 * 	media.getProxiedUrl({ width: 100, height: 100 });
	 * 	media.getProxiedUrl({ width: 100, height: 100, fitIn: true });
	 * 	media.getProxiedUrl({ width: 100, height: 100, smart: true });
	 * 	media.getProxiedUrl({ width: 100, height: 100, filters: { format: 'webp' } });
	 *
	 * @param IThumborOptions options
	 * @return string
	 */
	public getProxiedUrl(
		options: IThumborOptions = {
			width: 1024,
		},
	): string {
		const url: string = this.getUrl();
		const parts: string[] = ['unsafe'];
		const filters: string[] = [];

		// Empty URL
		if (!url) {
			return url;
		}

		// Automatic webp
		filters.push('format(webp)');

		// Handle dimensions
		if (options.width || options.height) {
			const dimension = `${options.width || ''}x${options.height || ''}`;

			if (options.fitIn) {
				parts.push('fit-in');
			}

			parts.push(dimension);
		}

		// Handle smart cropping
		if (options.smart) {
			parts.push('smart');
		}

		// Handle filters
		if (options.filters) {
			if (options.filters.quality) {
				filters.push(`quality(${options.filters.quality})`);
			}

			if (options.filters.blur) {
				filters.push(`blur(${options.filters.blur})`);
			}

			if (options.filters.brightness) {
				filters.push(`brightness(${options.filters.brightness})`);
			}

			if (options.filters.contrast) {
				filters.push(`contrast(${options.filters.contrast})`);
			}

			if (options.filters.grayscale) {
				filters.push('grayscale()');
			}

			if (options.filters.watermark) {
				const wm = options.filters.watermark;
				filters.push(`watermark(${wm.image},${wm.x},${wm.y},${wm.transparency || 0})`);
			}

			if (filters.length > 0) {
				parts.push(`filters:${filters.join(':')}`);
			}
		}

		return `${this.proxyUrl}/${parts.join('/')}/${this.getUrl()}`;
	}

	/**
	 * @return string
	 */
	public getType(): string {
		return this.attr('type') as string;
	}

	/**
	 * @return string
	 */
	public getUrl(): string {
		return this.attr('url') as string;
	}

	/**
	 * @return string
	 */
	public getUrlSmall(): string {
		return this.getProxiedUrl({ width: 256 });
	}

	/**
	 * @return string
	 */
	public getUrlMedium(): string {
		return this.getProxiedUrl({ width: 512 });
	}

	/**
	 * @return string
	 */
	public getUrlLarge(): string {
		return this.getProxiedUrl({ width: 1024 });
	}

	// endregion: Getters
}
