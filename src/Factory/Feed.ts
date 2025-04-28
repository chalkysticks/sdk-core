import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.Feed
 */
export function model(options: Record<string, any> = {}): Model.Feed {
	return new Model.Feed(
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
 * @return Collection.Feed
 */
export function collection(options: Record<string, any> = {}): Collection.Feed {
	const collection = new Collection.Feed(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);

	return collection;
}
