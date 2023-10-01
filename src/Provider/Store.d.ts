export declare class Store {
    private static instance;
    static get(): IStore;
    static register(store: IStore): void;
}
export default Store;
