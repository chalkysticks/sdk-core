import * as Collection from '../Collection/index.js';
import * as Model from '../Model/index.js';
import Constants from '../Common/Constants.js';

/**
 * @param Record<string, any> options
 * @return Model.Comment
 */
export function model(options: Record<string, any> = {}): Model.Comment {
	return new Model.Comment(
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
 * @return Collection.Comment
 */
export function collection(options: Record<string, any> = {}): Collection.Comment {
	const collection = new Collection.Comment(
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
 * Create a comment for a specific entity
 *
 * @param string entity_type
 * @param number|string entity_id
 * @param string body
 * @param Record<string, any> options
 * @return Model.Comment
 */
export function createFor(entity_type: string, entity_id: number | string, body: string, options: Record<string, any> = {}): Model.Comment {
	const instance = model(options);

	instance.set({
		entity_type,
		entity_id,
		body,
	});

	return instance;
}

/**
 * Create a reply to an existing comment
 *
 * @param number|string parent_id
 * @param string body
 * @param Record<string, any> options
 * @return Model.Comment
 */
export function createReply(parent_id: number | string, body: string, options: Record<string, any> = {}): Model.Comment {
	const instance = model(options);

	instance.set({
		body,
		parent_id,
	});

	return instance;
}
