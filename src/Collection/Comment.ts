import * as Model from '../Model/index.js';
import { Base } from './Base.js';
import { IAttributes, IDispatcherEvent } from 'restmc';

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
	 * We specifically don't set models here because the Model doesn't exist
	 * until constructor is done. We must use hydrate for that. Don't add data.
	 *
	 * If we do it early, we won't get FilmModels, we'll get Models.
	 *
	 * @param IAttributes options
	 */
	constructor(options: IAttributes = {}) {
		super(options);

		// Bindings
		this.Handle_OnAddBeforeSetParentId = this.Handle_OnAddBeforeSetParentId.bind(this);
	}

	/**
	 * @return void
	 */
	public attachEvents(): void {
		super.attachEvents();

		this.on('add:before', this.Handle_OnAddBeforeSetParentId);
	}

	/**
	 * @return void
	 */
	public detachEvents(): void {
		super.detachEvents();

		this.off('add:before', this.Handle_OnAddBeforeSetParentId);
	}

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

	// region: Event Handlers
	// ---------------------------------------------------------------------------

	/**
	 * @param IDispatcherEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnAddBeforeSetParentId(e: IDispatcherEvent): Promise<void> {
		const commentModel = e.detail.model as Model.Comment;
		const parentEndpoint = commentModel.parent?.parent?.endpoint;
		let entityType = parentEndpoint || 'content';

		switch (parentEndpoint) {
			case 'venues':
				entityType = 'venue';
				break;

			case 'users':
				entityType = 'user';
				break;

			case 'facts':
				entityType = 'fact';
				break;
		}

		commentModel.set({
			entity_id: commentModel.parent?.parent?.id,
			entity_type: entityType,
		});

		// Unset modified endpoint
		commentModel.cancelModifiedEndpoint();
	}

	// endregion: Event Handlers
}
