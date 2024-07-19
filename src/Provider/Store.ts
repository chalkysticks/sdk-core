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
	private instance: IStore;

	/**
	 * Register a Store instance to the provider
	 *
	 * @param IStore store
	 * @return void
	 */
	public get(): IStore {
		if (!this.instance) {
			this.register({
				actions: {},
				commit: (context: any, payload: any) => {},
				dispatch: (context: any, payload: any) => {},
				getters: {},
				mutations: {},
				state: {},
			});
		}

		return this.instance as IStore;
	}

	/**
	 * Register a Store instance to the provider
	 *
	 * @param IStore store
	 * @return void
	 */
	public register(store: IStore): void {
		this.instance = store;
	}
}

export default new Store();
