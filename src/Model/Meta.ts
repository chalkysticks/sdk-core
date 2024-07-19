import { Base } from './Base';

/**
 * @class Meta
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Meta extends Base {
	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['id', 'group', 'key', 'value'];

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
	public getKey(): string {
		return this.attr('key') as string;
	}

	/**
	 * @return string
	 */
	public getValue(): string {
		return this.attr('value') as string;
	}

	// endregion: Getters
}
