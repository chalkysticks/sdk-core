import { Base } from './Base';

/**
 * @class Rulebook
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Rulebook extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/rulebooks
	 *
	 * @type string
	 */
	public endpoint: string = 'rulebooks';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['content'];

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return string
	 */
	public getContent(): string {
		return this.attr('content') as string;
	}

	// endregion: Getters
}
