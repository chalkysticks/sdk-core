import * as Model from '../Model';
import { Constants } from '@chalkysticks/sdk-core';

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
