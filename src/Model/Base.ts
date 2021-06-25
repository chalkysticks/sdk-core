import Environment from '../Common/Environment';
import { Model } from 'eloquent-js';

/**
 *  ┌────────────────────────────────────────────────────────────────────────────┐
 *  │                                                                            │
 *  │ Additional functionality to EloquentJS Model                               │
 *  │                                                                            │
 *  └────────────────────────────────────────────────────────────────────────────┘
 */
export default class ModelBase extends Model {
    /**
     * Setup
     *
     * @param Object attributes
     * @param Object options
     */
    public constructor(attributes: any = {}, options: any = {}) {
        super(attributes, options);

        // Set base url if not explicitly set
        if (!options.baseUrl) {
            this.baseUrl = Environment.app.api_url;
        }
    }
}
