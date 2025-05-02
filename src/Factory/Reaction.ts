import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.Reaction
 */
export function model(options: Record<string, any> = {}): Model.Reaction {
	return new Model.Reaction(
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
 * @return Collection.Reaction
 */
export function collection(options: Record<string, any> = {}): Collection.Reaction {
	const collection = new Collection.Reaction(
		Object.assign(
			{
				baseUrl: Constants.API_URL_V3,
			},
			options,
		),
	);

	return collection;
}

/**
 * Create a reaction for a specific entity
 *
 * @param string entity_type
 * @param number|string entity_id
 * @param string type
 * @param Record<string, any> options
 * @return Model.Reaction
 */
export function createFor(entity_type: string, entity_id: number | string, type: string, options: Record<string, any> = {}): Model.Reaction {
	const instance = model(options);

	instance.set({
		entity_id,
		entity_type,
		type,
	});

	return instance;
}

/**
 * Create a like reaction for a specific entity
 *
 * @param string entity_type
 * @param number|string entity_id
 * @param Record<string, any> options
 * @return Model.Reaction
 */
export function like(entity_type: string, entity_id: number | string, options: Record<string, any> = {}): Model.Reaction {
	return createFor(entity_type, entity_id, 'like', options);
}

/**
 * Create a dislike reaction for a specific entity
 *
 * @param string entity_type
 * @param number|string entity_id
 * @param Record<string, any> options
 * @return Model.Reaction
 */
export function dislike(entity_type: string, entity_id: number | string, options: Record<string, any> = {}): Model.Reaction {
	return createFor(entity_type, entity_id, 'dislike', options);
}
