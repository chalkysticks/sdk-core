import { Base } from './Base';

/**
 * @class ContentTag
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class ContentTag extends Base {
	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['content_id', 'tag'];

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return string
	 */
	public getTag(): string {
		return this.attr('tag') as string;
	}

	// endregion: Getters
}
