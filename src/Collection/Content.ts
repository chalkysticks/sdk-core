import * as Model from '../Model';
import { Base } from './Base';

/**
 * @class Content
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Content extends Base<Model.Content> {
	/**
	 * @type Model.Content
	 */
	public model: Model.Content = new Model.Content();

	/**
	 * @return Content
	 */
	public news(): this {
		return this.tags(['news']);
	}

	/**
	 * @return Content
	 */
	public pad(): this {
		return this.tags(['pad']);
	}

	/**
	 * @param string[] tags
	 * @return Content
	 */
	public tags(tags: string[] = []): this {
		this.setQueryParam('tags', tags.join(','));

		return this;
	}

	/**
	 * @return Content
	 */
	public tutorials(): this {
		return this.tags(['tutorial']);
	}
}
