import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Comment
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Comment extends Base<Model.Comment> {
	/**
	 * Model that this collection manages
	 *
	 * @type any
	 */
	public model: Model.Comment = new Model.Comment();

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
	 * Get root comments (those without a parent)
	 *
	 * @return this
	 */
	public rootOnly(): this {
		this.builder.qp('parent_id', 'null');

		return this;
	}

	/**
	 * Get comments by parent ID
	 *
	 * @param number|string parent_id
	 * @return this
	 */
	public byParent(parent_id: number | string): this {
		this.builder.qp('parent_id', parent_id);

		return this;
	}

	/**
	 * Get comments by user ID
	 *
	 * @param number|string user_id
	 * @return this
	 */
	public byUser(user_id: number | string): this {
		this.builder.qp('user_id', user_id);

		return this;
	}
}
