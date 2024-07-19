import { Base } from './Base';

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
	public fields: string[] = ['id', 'type', 'url', 'created_at', 'updated_at'];

	// region: Getters
	// ---------------------------------------------------------------------------

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

	// endregion: Getters
}
