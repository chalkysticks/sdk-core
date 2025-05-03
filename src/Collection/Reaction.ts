import * as Enum from '../Enum/index.js';
import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Reaction
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Reaction extends Base<Model.Reaction> {
	/**
	 * Model that this collection manages
	 *
	 * @type any
	 */
	public model: Model.Reaction = new Model.Reaction();

	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/reactions
	 *
	 * @type string
	 */
	public endpoint: string = 'reactions';

	// region: Filters
	// ---------------------------------------------------------------------------

	/**
	 * Filter angry
	 *
	 * @return Reaction
	 */
	public get angry(): Reaction {
		return this.where({ type: Enum.ReactionType.Angry }) as Reaction;
	}

	/**
	 * Filter dislikes
	 *
	 * @return Reaction
	 */
	public get dislike(): Reaction {
		return this.where({ type: Enum.ReactionType.Dislike }) as Reaction;
	}

	/**
	 * Filter dislikes
	 *
	 * @return Reaction
	 */
	public get laugh(): Reaction {
		return this.where({ type: Enum.ReactionType.Laugh }) as Reaction;
	}

	/**
	 * Filter likes
	 *
	 * @return Reaction
	 */
	public get like(): Reaction {
		return this.where({ type: Enum.ReactionType.Like }) as Reaction;
	}

	/**
	 * Filter sads
	 *
	 * @return Reaction
	 */
	public get sad(): Reaction {
		return this.where({ type: Enum.ReactionType.Sad }) as Reaction;
	}

	/**
	 * Filter wow
	 *
	 * @return Reaction
	 */
	public get wow(): Reaction {
		return this.where({ type: Enum.ReactionType.Wow }) as Reaction;
	}

	// endregion: Filters

	// region: Special Fetch
	// ---------------------------------------------------------------------------

	/**
	 * @param string entity_type
	 * @param number|string entity_id
	 * @return this
	 */
	public forEntity(entity_type: string, entity_id: number | string): this {
		this.builder.qp('entity_type', entity_type);
		this.builder.qp('entity_id', entity_id);
		return this;
	}

	/**
	 * Get reactions by type
	 *
	 * @param string type
	 * @return this
	 */
	public byType(type: string): this {
		this.builder.qp('type', type);
		return this;
	}

	/**
	 * Get reactions by user ID
	 *
	 * @param number|string user_id
	 * @return this
	 */
	public byUser(user_id: number | string): this {
		this.builder.qp('user_id', user_id);
		return this;
	}

	// endregion: Special Fetch
}
