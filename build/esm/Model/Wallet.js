import * as Model from '.';
import Constants from '../Common/Constants';
import { Base } from './Base';
export class Wallet extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'wallet';
        this.fields = ['id', 'user_id', 'challenger_id', 'transaction', 'source', 'source_id', 'created_at', 'updated_at'];
    }
    static async collect() {
        const walletModel = new Wallet();
        walletModel.id = '';
        walletModel.endpoint = 'wallet/collect';
        await walletModel.save();
        return walletModel;
    }
    get user() {
        return this.hasOne('user', Model.User);
    }
    get challenger() {
        return this.hasOne('challenger', Model.User);
    }
    canCollect() {
        const threshold = Constants.WALLET_COLLECTION_TIME;
        const now = new Date();
        const updatedAt = new Date(this.getUpdatedAt());
        const diff = now.getTime() - updatedAt.getTime();
        return diff >= threshold;
    }
    getSource() {
        return this.attr('source');
    }
    getTransaction() {
        return this.attr('transaction');
    }
    getCreatedAt() {
        return this.attr('created_at');
    }
    getUpdatedAt() {
        return this.attr('updated_at');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL01vZGVsL1dhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEtBQUssS0FBSyxNQUFNLEdBQUcsQ0FBQztBQUMzQixPQUFPLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTzlCLE1BQU0sT0FBTyxNQUFPLFNBQVEsSUFBSTtJQUFoQzs7UUFPUSxhQUFRLEdBQVcsUUFBUSxDQUFDO1FBTzVCLFdBQU0sR0FBYSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQWdGaEksQ0FBQztJQXhFTyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU87UUFDMUIsTUFBTSxXQUFXLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNqQyxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNwQixXQUFXLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXpCLE9BQU8sV0FBVyxDQUFDO0lBQ3BCLENBQUM7SUFPRCxJQUFXLElBQUk7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFjTSxVQUFVO1FBQ2hCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQztRQUNuRCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFakQsT0FBTyxJQUFJLElBQUksU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFLTSxTQUFTO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBVyxDQUFDO0lBQ3RDLENBQUM7SUFLTSxjQUFjO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQVcsQ0FBQztJQUMzQyxDQUFDO0lBS00sWUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFXLENBQUM7SUFDMUMsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzFDLENBQUM7Q0FHRCJ9