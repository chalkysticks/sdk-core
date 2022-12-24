"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StoreProvider {
    static get() {
        if (!this.instance) {
            this.register({ state: {} });
        }
        return this.instance;
    }
    static register(store) {
        this.instance = store;
    }
}
exports.default = StoreProvider;
//# sourceMappingURL=Store.js.map