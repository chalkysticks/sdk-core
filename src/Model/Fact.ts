import { Base } from './Base.js';

/**
 * @class Fact
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Fact extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/facts
	 *
	 * @type string
	 */
	public endpoint: string = 'facts';

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
	public getContext(): string {
		return this.attr('context') as string;
	}

	/**
	 * @return string
	 */
	public getFact(): string {
		return this.attr('fact') as string;
	}

	/**
	 * @return string
	 */
	public getSource(): string {
		return this.attr('source') as string;
	}

	/**
	 * @return boolean
	 */
	public isValidated(): boolean {
		return !!this.attr('validated');
	}

	// endregion: Getters
}
