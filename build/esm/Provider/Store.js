export class Store {
    get() {
        if (!this.instance) {
            this.register({
                actions: {},
                getters: {},
                mutations: {},
                state: {},
            });
        }
        return this.instance;
    }
    register(store) {
        this.instance = store;
    }
}
export default new Store();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvUHJvdmlkZXIvU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxPQUFPLEtBQUs7SUFjVixHQUFHO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNiLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxFQUFFO2dCQUNiLEtBQUssRUFBRSxFQUFFO2FBQ1QsQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLFFBQWtCLENBQUM7SUFDaEMsQ0FBQztJQVFNLFFBQVEsQ0FBQyxLQUFhO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRDtBQUVELGVBQWUsSUFBSSxLQUFLLEVBQUUsQ0FBQyJ9