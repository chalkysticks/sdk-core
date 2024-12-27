import { Base } from './Base.js';

/**
 * @class Advertisement
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Advertisement extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/ads
	 *
	 * @type string
	 */
	public endpoint: string = 'ads';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['caption', 'company', 'image', 'url'];

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return string
	 */
	public getCaption(): string {
		return this.attr('caption') as string;
	}

	/**
	 * @return string
	 */
	public getCompany(): string {
		return this.attr('company') as string;
	}

	/**
	 * @return string
	 */
	public getImage(): string {
		return this.attr('image') as string;
	}

	/**
	 * @return string
	 */
	public getUrl(): string {
		return this.attr('url') as string;
	}

	// endregion: Getters
}
