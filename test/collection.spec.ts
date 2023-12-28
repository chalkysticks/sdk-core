import test from 'node:test';
import assert from 'node:assert/strict';
import { Collection, Model } from '../src';

test('hello', () => {
	const message = 'Hello';
	assert.equal(message, 'Hello', 'checking the greeting');
});

/**
 * CollectionBase Test
 */
test('Collection should have length', () => {
	const collection: Collection.Base = new Collection.Base();

	collection.add(new Model.Base());
	collection.add(new Model.Base());
	collection.add(new Model.Base());
	collection.add(new Model.Base());
	collection.add(new Model.Base());

	assert.equal(collection.length, 5);
});
