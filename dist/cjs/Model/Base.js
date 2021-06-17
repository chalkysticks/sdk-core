"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("../Common/Environment");
const eloquent_js_1 = require("eloquent-js");
class ModelBase extends eloquent_js_1.Model {
    constructor() {
        super(...arguments);
        this.baseUrl = Environment_1.default.app.api_url;
    }
}
exports.default = ModelBase;
//# sourceMappingURL=Base.js.map