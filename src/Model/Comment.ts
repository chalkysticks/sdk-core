import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';

/**
 * @class Comment
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Comment extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/comments
	 *
	 * @type string
	 */
	public endpoint: string = 'comments';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['user_id', 'body', 'parent_id', 'is_edited', 'is_flagged', 'meta', 'created_at', 'updated_at'];

	// region: Relationship
	// ---------------------------------------------------------------------------

	public get children(): Collection.Comment {
		return this.hasMany<Collection.Comment>('children', Collection.Comment);
	}

	// public get flags(): Collection.Base<any> {
	// 	return this.hasMany<Collection.Base<any>>('flags', Collection.Base);
	// }

	public get parentComment(): Comment {
		return this.hasOne<Comment>('parent', Comment);
	}

	public get user(): Model.User {
		return this.hasOne<Model.User>('user', Model.User);
	}

	// endregion: Relationship

	// region: Actions
	// ---------------------------------------------------------------------------

	/**
	 * @param object params
	 * @return Comment
	 */
	public reply(params: any = {}): Comment {
		return new Comment(
			{
				...params,
				parent_id: this.id,
			},
			{
				token: this.token || this.options.token,
			},
		);
	}

	// endregion: Actions

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return string
	 */
	public getBody(): string {
		return this.attr('body') as string;
	}

	/**
	 * @return number
	 */
	public getParentCommentId(): number {
		return this.attr('parent_id') as number;
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
	public hasChildren(): boolean {
		return this.children.length > 0;
	}

	/**
	 * `hasParent` is used by RestMC so this will mess up deletion
	 *
	 * @return boolean
	 */
	public hasParentComment(): boolean {
		return !!this.getParentCommentId();
	}

	/**
	 * @return boolean
	 */
	public isEdited(): boolean {
		return !!this.attr('is_edited');
	}

	/**
	 * @return boolean
	 */
	public isFlagged(): boolean {
		return !!this.attr('is_flagged');
	}

	// endregion: Getters
}
