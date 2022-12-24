"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("./Base");
const User_1 = require("../Model/User");
class CollectionUser extends Base_1.default {
    constructor() {
        super(...arguments);
        this.endpoint = 'user';
        this.model = new User_1.default();
    }
}
exports.default = CollectionUser;
//# sourceMappingURL=User.js.map