import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';

/**
 * @class Reaction
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Reaction extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/reactions
	 *
	 * @type string
	 */
	public endpoint: string = 'reactions';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['user_id', 'type', 'created_at', 'updated_at'];

	// region: Relationship
	// ---------------------------------------------------------------------------

	public get user(): Model.User {
		return this.hasOne<Model.User>('user', Model.User);
	}

	// endregion: Relationship

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return string
	 */
	public getType(): string {
		return this.attr('type') as string;
	}

	/**
	 * @return number
	 */
	public getUserId(): number {
		return this.attr('user_id') as number;
	}

	/**
	 * @return boolean
	 */
	public isLike(): boolean {
		return this.getType() === 'like';
	}

	/**
	 * @return boolean
	 */
	public isDislike(): boolean {
		return this.getType() === 'dislike';
	}

	// endregion: Getters
}
