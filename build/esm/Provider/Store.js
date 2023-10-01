export class Store {
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
export default Store;
//# sourceMappingURL=Store.js.map