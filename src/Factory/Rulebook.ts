import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.Rulebook
 */
export function model(options: Record<string, any> = {}): Model.Rulebook {
	return new Model.Rulebook(
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
 * @return Collection.Rulebook
 */
export function collection(options: Record<string, any> = {}): Collection.Rulebook {
	const collection = new Collection.Rulebook(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);

	return collection;
}
