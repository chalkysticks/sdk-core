/**
 * @class StoreProvider
 * @package Provider
 * @project ChalkySticks SDK Core
 */
export default class StoreProvider {
    /**
     * Reference to Store
     *
     * @type IStore
     */
    static instance;
    /**
     * Register a Store instance to the provider
     *
     * @param IStore store
     * @return void
     */
    static get() {
        if (!this.instance) {
            this.register({ state: {} });
        }
        return this.instance;
    }
    /**
     * Register a Store instance to the provider
     *
     * @param IStore store
     * @return void
     */
    static register(store) {
        this.instance = store;
    }
}
