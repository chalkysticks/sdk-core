import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.User
 */
export function model(options: Record<string, any> = {}): Model.User {
	return new Model.User(
		undefined,
		Object.assign(
			{
				baseUrl: Constants.API_URL_V1,
			},
			options,
		),
	);
}

/**
 * @param Record<string, any> options
 * @return Collection.User
 */
export function collection(options: Record<string, any> = {}): Collection.User {
	const collection = new Collection.User(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V1,
			},
			options,
		),
	);

	return collection;
}
