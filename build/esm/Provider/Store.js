export class Store {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUHJvdmlkZXIvU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxPQUFPLEtBQUs7SUFjVixNQUFNLENBQUMsR0FBRztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFRTSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQWE7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztDQUNEO0FBRUQsZUFBZSxLQUFLLENBQUMifQ==