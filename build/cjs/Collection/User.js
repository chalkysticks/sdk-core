"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Model = require("../Model");
const Base_1 = require("./Base");
class User extends Base_1.Base {
    constructor() {
        super(...arguments);
        this.model = new Model.User();
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map