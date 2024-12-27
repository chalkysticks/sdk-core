import * as Model from '../Model';
import { Base } from './Base';

/**
 * @class ContentTag
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class ContentTag extends Base<Model.ContentTag> {
	/**
	 * @type Model.ContentTag
	 */
	public model: Model.ContentTag = new Model.ContentTag();

	/**
	 * @param string tag
	 * @return Model.ContentTag[]
	 */
	public getByTag(tag: string): Model.ContentTag[] {
		return this.models.filter((contentTag) => contentTag.getTag() === tag);
	}
}
