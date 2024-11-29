import * as Collection from '../Collection';
import * as Model from '../Model';
import { Constants } from '@chalkysticks/sdk-core';

/**
 * @param Record<string, any> options
 * @return Model.Wallet
 */
export function model(options: Record<string, any> = {}): Model.Wallet {
	return new Model.Wallet(
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
 * @return Collection.Wallet
 */
export function collection(options: Record<string, any> = {}): Collection.Wallet {
	const collection = new Collection.Wallet(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);

	return collection;
}
