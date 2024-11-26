import * as Collection from '../Collection';
import * as Model from '../Model';
import Constants from '../Common/Constants';

/**
 * @param Record<string, any> options
 * @return Model.Advertisement
 */
export function model(options: Record<string, any> = {}): Model.Advertisement {
	return new Model.Advertisement(
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
 * @return Collection.Advertisement
 */
export function collection(options: Record<string, any> = {}): Collection.Advertisement {
	const collection = new Collection.Advertisement(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V1,
			},
			options,
		),
	);

	return collection;
}
