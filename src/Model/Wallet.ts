import * as Collection from '../Collection';
import * as Model from '.';
import Constants from '../Common/Constants';
import { Base } from './Base';

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
	public endpoint: string = 'userwallet';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['id', 'user_id', 'challenger_id', 'transaction', 'source', 'source_id', 'created_at', 'updated_at'];

	// region: Relationships
	// ---------------------------------------------------------------------------

	public get user(): Model.User {
		return this.hasOne('user', Model.User);
	}

	public get challenger(): Model.User {
		return this.hasOne('challenger', Model.User);
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

	/**
	 * @return string
	 */
	public getCreatedAt(): string {
		return this.attr('created_at') as string;
	}

	/**
	 * @return string
	 */
	public getUpdatedAt(): string {
		return this.attr('updated_at') as string;
	}

	// endregion: Getters
}
