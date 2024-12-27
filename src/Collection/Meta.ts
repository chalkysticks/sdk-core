import * as Model from '../Model/index.js';
import { Base } from './Base.js';

/**
 * @class Meta
 * @package Collection
 * @project ChalkySticks SDK Core
 */
export class Meta extends Base<Model.Meta> {
	/**
	 * @type Model.Meta
	 */
	public model: Model.Meta = new Model.Meta();

	/**
	 * @param string key
	 * @return Model.Meta[]
	 */
	public getByKey(key: string): Model.Meta[] {
		return this.models.filter((meta) => meta.getKey() === key);
	}

	/**
	 * @param string group
	 * @return Model.Meta[]
	 */
	public getByGroup(group: string): Model.Meta[] {
		return this.models.filter((meta) => meta.getGroup() === group);
	}

	/**
	 * @return string[]
	 */
	public getKeys(): string[] {
		return this.models.map((meta) => meta.getKey());
	}

	/**
	 * @return string[]
	 */
	public getValues(): string[] {
		return this.models.map((meta) => meta.getValue());
	}

	/**
	 * @return string[]
	 */
	public getValuesByKey(key: string): string[] {
		return this.getByKey(key).map((meta: Model.Meta) => meta.getValue());
	}

	/**
	 * @return string[]
	 */
	public getValuesByGroup(group: string): string[] {
		return this.getByGroup(group).map((meta: Model.Meta) => meta.getValue());
	}
}
