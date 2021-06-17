import { Collection } from 'eloquent-js';
export default class CollectionBase extends Collection {
    baseUrl: string;
    limit: number;
    constructor(options?: any);
}
