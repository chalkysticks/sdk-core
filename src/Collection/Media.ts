import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Media
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Media extends Base<Model.Media> {
	/**
	 * @type Model.Media
	 */
	public model: Model.Media = new Model.Media();

	/**
	 * @return Model.Media[]
	 */
	public get images(): Model.Media[] {
		return this.models.filter((media) => media.getType() === 'image');
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
		return this.models.filter((media) => media.getType() === 'video');
	}
}
