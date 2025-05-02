import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.Fact
 */
export function model(options: Record<string, any> = {}): Model.Fact {
	return new Model.Fact(
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
 * @return Collection.Fact
 */
export function collection(options: Record<string, any> = {}): Collection.Fact {
	const collection = new Collection.Fact(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);

	return collection;
}
