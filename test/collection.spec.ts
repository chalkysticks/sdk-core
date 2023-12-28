import { expect } from 'chai';
import { Collection, Model } from '../src';

/**
 * CollectionBase Test
 */
describe('CollectionBase', () => {
	it('should have length', () => {
		const collection: Collection.Base = new Collection.Base();

		collection.add(new Model.Base());
		collection.add(new Model.Base());
		collection.add(new Model.Base());
		collection.add(new Model.Base());
		collection.add(new Model.Base());

		expect(collection.length).to.equal(5);
	});
});
