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
	public fields: string[] = ['id', 'group', 'key', 'value', 'created_at', 'updated_at'];

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

	/**
	 * @return string
	 */
	public getCreatedAt(): string {
		return this.attr('created_at') as string;
	}

	/**
	 * @return string
	 */
	public getUpdatedAt(): string {
		return this.attr('updated_at') as string;
	}

	// endregion: Getters
}
