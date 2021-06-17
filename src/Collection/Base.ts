import Environment from '../Common/Environment';
import ModelBase from '../Model/Base';
import { Collection, IModelRequestOptions, IModelRequestQueryParams, Request } from 'eloquent-js';

/**
 *  ┌────────────────────────────────────────────────────────────────────────────┐
 *  │                                                                            │
 *  │ Additional functionality to EloquentJS Collection                          │
 *  │                                                                            │
 *  └────────────────────────────────────────────────────────────────────────────┘
 */
export default class CollectionBase extends Collection {
    /**
     * Base URL for the API
     *
     * @type string
     */
    public baseUrl: string = Environment.app.api_url;

    /**
     * Limit
     *
     * @type number
     */
    public limit: number = Environment.app.limit;

    /**
     * Constructor
     */
    constructor(options: any = {}) {
        super(options);

        // Build
        this.builder.qp('limit', this.limit);
        this.builder.qp('page', this.page);
    }
}
