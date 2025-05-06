import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import Constants from '../Common/Constants.js';
import { Base } from './Base.js';

/**
 * @class Wallet
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Wallet extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/wallet
	 *
	 * @type string
	 */
	public endpoint: string = 'wallet';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['id', 'user_id', 'challenger_id', 'transaction', 'source', 'source_id', 'created_at', 'updated_at'];

	// region: Actions
	// ---------------------------------------------------------------------------

	/**
	 * @param string token
	 * @return Promise<Wallet>
	 */
	public async collect(token: string): Promise<Wallet> {
		this.setHeader('Authorization-API', `Bearer ${token}`);
		this.setHeader('Content-Type', 'application/json');
		this.id = '';
		this.endpoint = 'wallet/collect';
		await this.save();

		return this;
	}

	// endregion: Actions

	// region: Relationships
	// ---------------------------------------------------------------------------

	// mk: Creates a circular dependency for toJSON
	// public get user(): Model.User {
	// 	return this.hasOne('user', Model.User);
	// }

	public get challenger(): Model.User {
		return this.hasOne<Model.User>('challenger', Model.User);
	}

	// public get source(): Model... {
	//     return this.hasOne('source', Model...);
	// }

	// endregion: Relationships

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return boolean
	 */
	public canCollect(): boolean {
		const threshold = Constants.WALLET_COLLECTION_TIME;
		const now = new Date();
		const updatedAt = new Date(this.getUpdatedAt());
		const diff = now.getTime() - updatedAt.getTime();

		return diff >= threshold;
	}

	/**
	 * @return string
	 */
	public getSource(): string {
		return this.attr('source') as string;
	}

	/**
	 * @return string
	 */
	public getTransaction(): string {
		return this.attr('transaction') as string;
	}

	// endregion: Getters
}
