import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.Statistic
 */
export function model(options: Record<string, any> = {}): Model.Statistic {
	return new Model.Statistic(
		undefined,
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);
}

/**
 * @param Record<string, any> options
 * @return Collection.Statistic
 */
export function collection(options: Record<string, any> = {}): Collection.Statistic {
	const collection = new Collection.Statistic(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);

	return collection;
}
