import Environment from '../Common/Environment';
import { Collection } from 'eloquent-js';
export default class CollectionBase extends Collection {
    baseUrl = Environment.app.api_url;
    limit = Environment.app.limit;
    constructor(options = {}) {
        super(options);
        this.builder.qp('limit', this.limit);
        this.builder.qp('page', this.page);
    }
}
//# sourceMappingURL=Base.js.map