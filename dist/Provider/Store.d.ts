export default class StoreProvider {
    private static instance;
    static get(): IStore;
    static register(store: IStore): void;
}
