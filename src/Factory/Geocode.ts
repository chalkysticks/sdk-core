import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.Geocode
 */
export function model(options: Record<string, any> = {}): Model.Geocode {
	return new Model.Geocode(
		undefined,
		Object.assign(
			{
				baseUrl: Constants.API_URL_V1,
			},
			options,
		),
	);
}
