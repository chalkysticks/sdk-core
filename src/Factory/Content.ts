import * as Collection from '../Collection';
import * as Model from '../Model';
import Constants from '../Common/Constants';

/**
 * @param Record<string, any> options
 * @return Model.Content
 */
export function model(options: Record<string, any> = {}): Model.Content {
	return new Model.Content(
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
 * @return Collection.Content
 */
export function collection(options: Record<string, any> = {}): Collection.Content {
	const collection = new Collection.Content(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);

	return collection;
}
