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
	 * Get likes only
	 *
	 * @return this
	 */
	public likes(): this {
		return this.byType('like');
	}

	/**
	 * Get dislikes only
	 *
	 * @return this
	 */
	public dislikes(): this {
		return this.byType('dislike');
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
}
