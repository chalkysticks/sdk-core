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
     * Base URL for the API
     *
     * @type string
     */
    public baseUrl: string = Environment.app.api_url;
}
