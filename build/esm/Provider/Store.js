export default class StoreProvider {
    static instance;
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
//# sourceMappingURL=Store.js.map