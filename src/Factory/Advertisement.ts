import * as Collection from '../Collection';
import * as Model from '../Model';
import { Constants } from '@chalkysticks/sdk-core';

/**
 * @return Model.Advertisement
 */
export function model(): Model.Advertisement {
	return new Model.Advertisement(undefined, {
		baseUrl: Constants.API_URL_V1,
	});
}

/**
 * @return Collection.Advertisement
 */
export function collection(): Collection.Advertisement {
	const collection = new Collection.Advertisement({
		baseUrl: Constants.API_URL_V1,
	});

	return collection;
}
