import * as Enum from '../Enum/index.js';
import * as Model from '../Model/index.js';
import * as Provider from '../Provider/index.js';
import { Base } from './Base.js';
import { IAttributes, IDispatcherEvent } from 'restmc';

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
	 * We specifically don't set models here because the Model doesn't exist
	 * until constructor is done. We must use hydrate for that. Don't add data.
	 *
	 * If we do it early, we won't get FilmModels, we'll get Models.
	 *
	 * @param IAttributes options
	 */
	constructor(options: IAttributes = {}) {
		super(options, false);

		// Bindings
		this.Handle_OnAddBeforeSetParentId = this.Handle_OnAddBeforeSetParentId.bind(this);

		// Setup
		this.setup(options);
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
	 * @param number|string owner_id
	 * @return this
	 */
	public byUser(owner_id: number | string): this {
		this.builder.qp('owner_id', owner_id);
		return this;
	}

	// endregion: Special Fetch

	// region: Helpers
	// ---------------------------------------------------------------------------

	/**
	 * Shortcut to add Love
	 *
	 * @param Enum.ReactionType type
	 * @return Promise<Model.Reaction | null>
	 */
	public async favorite(): Promise<Model.Reaction | null> {
		return this.addReaction(Enum.ReactionType.Love);
	}

	/**
	 * Shortcut to remove Love
	 *
	 * @param Enum.ReactionType type
	 * @return Promise<boolean | null>
	 */
	public async unfavorite(): Promise<boolean | null> {
		return this.removeReaction(Enum.ReactionType.Love);
	}

	/**
	 * Add a reaction of the given type for the current user (if not already present)
	 *
	 * @param Enum.ReactionType type
	 * @return Promise<Model.Reaction>
	 */
	public async addReaction(type: Enum.ReactionType): Promise<Model.Reaction> {
		this.ensureToken(this.token || this.options.token);
		this.add({ type });

		const reactionModel = this.last() as Model.Reaction;
		await reactionModel.save();

		return reactionModel;
	}

	/**
	 * Remove a reaction of the given type for the current user
	 *
	 * @param Enum.ReactionType type
	 * @return Promise<boolean>
	 */
	public async removeReaction(type: Enum.ReactionType): Promise<boolean> {
		const userModel = this.getUser();
		const owner_id = userModel?.id || 0;

		const reaction = this.where(
			{
				owner_id,
				type,
			},
			true,
			true,
		);

		if (!reaction) return false;

		this.ensureToken(this.token || this.options.token);

		await reaction.delete();
		this.remove([reaction]);

		return true;
	}

	/**
	 * Toggle a reaction of the given type for the current user
	 *
	 * @param Enum.ReactionType type
	 * @return Promise<void>
	 */
	public async toggleReaction(type: Enum.ReactionType): Promise<void> {
		const userModel = this.getUser();
		const owner_id = userModel?.id || 0;

		this.hasReaction(type) ? await this.removeReaction(type) : await this.addReaction(type);
	}

	/**
	 * Check if a reaction of the given type exists for the current user
	 *
	 * @param Enum.ReactionType type
	 * @return boolean
	 */
	public hasReaction(type: Enum.ReactionType): boolean {
		const userModel = this.getUser();
		const owner_id = userModel?.id || 0;

		return !!this.where(
			{
				owner_id,
				type,
			},
			true,
			true,
		);
	}

	/**
	 * Get the current user
	 *
	 * @return Model.User
	 */
	protected getUser(): Model.User {
		const store: IStore = Provider.Store.get();
		const userModel = store?.getters['authentication/user'];

		return userModel || new Model.User();
	}

	// endregion: Helpers

	// region: Event Handlers
	// ---------------------------------------------------------------------------

	/**
	 * @todo this might have an issue if threads go beyond 2 levels
	 * due to how we're doing the 'endpoint' thing. This is a bad solution
	 * but I implemented it late night.
	 *
	 * @param IDispatcherEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnAddBeforeSetParentId(e: IDispatcherEvent): Promise<void> {
		const reactionModel = e.detail.model as Model.Comment;
		const parentEndpoint = reactionModel.parent?.parent?.endpoint;
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

		reactionModel.set({
			entity_id: reactionModel.parent?.parent?.id,
			entity_type: entityType,
		});

		// Unset modified endpoint
		reactionModel.cancelModifiedEndpoint();
	}

	// endregion: Event Handlers
}
