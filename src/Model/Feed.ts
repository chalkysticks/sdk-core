import * as Collection from '../Collection/index.js';
import * as YouTube from '../Utility/YouTube.js';
import { Base } from './Base.js';

/**
 * @class Feed
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Feed extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/feed
	 *
	 * @type string
	 */
	public endpoint: string = 'feed';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['lat', 'lon', 'type', 'created_at', 'updated_at'];

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return number
	 */
	public getDistance(): number {
		return parseFloat(this.attr('distance') as string);
	}

	/**
	 * @return string
	 */
	public getHtmlMessage(): string {
		return this.attr('html_message') as string;
	}

	/**
	 * @return number
	 */
	public getLatitude(): number {
		return parseFloat(this.attr('lat') as string);
	}

	/**
	 * @return number
	 */
	public getLongitude(): number {
		return parseFloat(this.attr('lon') as string);
	}

	/**
	 * @return string
	 */
	public getMessage(asHtml: boolean = false): string {
		return asHtml ? this.getHtmlMessage() : (this.attr('plain_message') as string);
	}

	/**
	 * @return number
	 */
	public getType(): number {
		return this.attr('type') as number;
	}

	// endregion: Getters
}
