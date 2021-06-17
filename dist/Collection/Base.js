"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("../Common/Environment");
const eloquent_js_1 = require("eloquent-js");
class CollectionBase extends eloquent_js_1.Collection {
    constructor(options = {}) {
        super(options);
        this.baseUrl = Environment_1.default.app.api_url;
        this.limit = Environment_1.default.app.limit;
        this.builder.qp('limit', this.limit);
        this.builder.qp('page', this.page);
    }
}
exports.default = CollectionBase;
//# sourceMappingURL=Base.js.map