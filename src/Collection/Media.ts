import * as Model from '../Model/index.js';
import * as Enum from '../Enum/index.js';
import { Base } from './Base.js';

/**
 * @class Media
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Media extends Base<Model.Media> {
	/**
	 * @return Model.Media | undefined
	 */
	public get avatar(): Model.Media | undefined {
		return this.findWhere({
			subgroup: Enum.MediaSubgroup.Avatar,
		});
	}

	/**
	 * @return Model.Media[]
	 */
	public get images(): Model.Media[] {
		return this.models.filter((media) => media.getType() === Enum.MediaType.Image);
	}

	/**
	 * @return Model.Media | undefined
	 */
	public get primary(): Model.Media | undefined {
		return this.models.at(0);
	}

	/**
	 * @return Model.Media[]
	 */
	public get videos(): Model.Media[] {
		return this.models.filter((media) => media.getType() === Enum.MediaType.Video);
	}

	/**
	 * @return boolean
	 */
	private get isUserEndpoint(): boolean {
		return !!this.parent?.endpoint.toLowerCase().includes('user');
	}

	/**
	 * @return boolean
	 */
	private get isVenueEndpoint(): boolean {
		return !!this.parent?.endpoint.toLowerCase().includes('venue');
	}

	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v1/media
	 *
	 * @type string
	 */
	public endpoint: string = 'media';

	/**
	 * Model object instantiated by this collection
	 *
	 * @type Model.Media
	 */
	public model: Model.Media = new Model.Media();

	// region: Actions
	// ---------------------------------------------------------------------------

	/**
	 * @return this
	 */
	public exterior(): this {
		return this.subgroup(Enum.MediaSubgroup.Exterior);
	}

	/**
	 * @return this
	 */
	public interior(): this {
		return this.subgroup(Enum.MediaSubgroup.Interior);
	}

	/**
	 * @return this
	 */
	public person(): this {
		return this.subgroup(Enum.MediaSubgroup.Person);
	}

	/**
	 * Add a random seed to the query
	 *
	 * @return Media
	 */
	public random(): this {
		const number = ~~(Math.random() * 100);
		this.setQueryParam('seed', number.toString());

		return this;
	}

	/**
	 * @return this
	 */
	public table(): this {
		return this.subgroup(Enum.MediaSubgroup.Table);
	}

	/**
	 * Set the media type like interior, table, etc
	 *
	 * @param {Enum.MediaSubgroup} subgroup
	 * @return Media
	 */
	public subgroup(subgroup: Enum.MediaSubgroup): this {
		this.setQueryParam('subgroup', subgroup);

		return this;
	}

	/**
	 * Set the media type like interior, table, etc
	 *
	 * @param {Enum.MediaType} subgroup
	 * @return Media
	 */
	public type(mediaType: Enum.MediaType): this {
		this.setQueryParam('type', mediaType);

		return this;
	}

	// endregion: Actions
}
