/**
 * @class Store
 * @package Provider
 * @project ChalkySticks SDK Core
 */
export class Store {
	/**
	 * Reference to Store
	 *
	 * @type IStore
	 */
	private static instance: IStore;

	/**
	 * Register a Store instance to the provider
	 *
	 * @param IStore store
	 * @return void
	 */
	public static get(): IStore {
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
	public static register(store: IStore): void {
		this.instance = store;
	}
}

export default Store;
