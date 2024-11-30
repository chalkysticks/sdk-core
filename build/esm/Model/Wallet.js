import * as Model from '.';
import Constants from '../Common/Constants';
import { Base } from './Base';
export class Wallet extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'wallet';
        this.fields = ['id', 'user_id', 'challenger_id', 'transaction', 'source', 'source_id', 'created_at', 'updated_at'];
    }
    async collect() {
        this.id = 'collect';
        await this.save();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL01vZGVsL1dhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEtBQUssS0FBSyxNQUFNLEdBQUcsQ0FBQztBQUMzQixPQUFPLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTzlCLE1BQU0sT0FBTyxNQUFPLFNBQVEsSUFBSTtJQUFoQzs7UUFPUSxhQUFRLEdBQVcsUUFBUSxDQUFDO1FBTzVCLFdBQU0sR0FBYSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQTRFaEksQ0FBQztJQXBFTyxLQUFLLENBQUMsT0FBTztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNwQixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBT0QsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBY00sVUFBVTtRQUNoQixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsc0JBQXNCLENBQUM7UUFDbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN2QixNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUNoRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWpELE9BQU8sSUFBSSxJQUFJLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBS00sU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQVcsQ0FBQztJQUN0QyxDQUFDO0lBS00sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFXLENBQUM7SUFDM0MsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzFDLENBQUM7SUFLTSxZQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQVcsQ0FBQztJQUMxQyxDQUFDO0NBR0QifQ==