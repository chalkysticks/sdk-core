import * as Model from '../Model';
import { Constants } from '@chalkysticks/sdk-core';

/**
 * @return Model.Geocode
 */
export function model(): Model.Geocode {
	return new Model.Geocode(undefined, {
		baseUrl: Constants.API_URL_V1,
	});
}
