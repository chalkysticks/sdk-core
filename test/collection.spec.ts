import { expect } from 'chai';
import CollectionBase from '../src/Collection/Base';
import ModelBase from '../src/Model/Base';

/**
 * CollectionBase Test
 */
describe('CollectionBase', () => {

    it('should have length', () => {
        const collection: CollectionBase = new CollectionBase();

        collection.add(new ModelBase);
        collection.add(new ModelBase);
        collection.add(new ModelBase);
        collection.add(new ModelBase);
        collection.add(new ModelBase);

        expect(collection.length).to.equal(5);
    });

});
