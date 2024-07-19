import * as Collection from '../Collection';
import { Base } from './Base';

/**
 * @class User
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class User extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/users
	 *
	 * @type string
	 */
	public endpoint: string = 'users';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['id', 'lat', 'lon', 'name', 'phone', 'slug', 'status', 'wallet_balance', 'created_at', 'updated_at'];

	// region: Relationship
	// ---------------------------------------------------------------------------

	public get games(): Collection.Meta {
		return this.hasMany('games', Collection.Meta);
	}

	public get media(): Collection.Media {
		return this.hasMany('media', Collection.Media);
	}

	public get metadata(): Collection.Meta {
		return this.hasMany('meta', Collection.Meta);
	}

	// endregion: Relationship

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * Retrieve User's Latitude
	 *
	 * @return number
	 */
	public getLatitude(): number {
		return parseFloat(this.attr('lat') as string);
	}

	/**
	 * Retrieve User's Longitude
	 *
	 * @return number
	 */
	public getLongitude(): number {
		return parseFloat(this.attr('lon') as string);
	}

	/**
	 * Retrieve User's name
	 *
	 * @return string
	 */
	public getName(): string {
		return this.attr('name') as string;
	}

	/**
	 * Retrieve User's permissions
	 *
	 * @return string
	 */
	public getPermissions(): number {
		return parseFloat(this.attr('permissions') as string);
	}

	/**
	 * Retrieve User's phone number
	 *
	 * @return string
	 */
	public getPhone(): string {
		return this.attr('phone') as string;
	}

	/**
	 * Retrieve User's slug
	 *
	 * @return string
	 */
	public getSlug(): string {
		return this.attr('slug') as string;
	}

	/**
	 * Retrieve User's status
	 *
	 * @return string
	 */
	public getStatus(): number {
		return parseFloat(this.attr('status') as string);
	}

	/**
	 * Get amount the user has in their wallet
	 *
	 * @return number
	 */
	public getWalletBalance(): number {
		return parseFloat(this.attr('wallet_balance') as string);
	}

	// endregion: Getters
}
