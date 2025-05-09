import * as Collection from '../Collection/index.js';
import * as Model from './index.js';
import { Base } from './Base.js';
import { RelationshipProperties } from '../Utility/Core.js';

/**
 * Merge interface for the property decorators
 *
 * @interface User
 */
export interface User {
	autoCheckin?: string;
	biography?: string;
	hometown?: string;
	lastLocation?: string;
	plays8Ball?: boolean;
	plays9Ball?: boolean;
	plays10Ball?: boolean;
	playsArtistic?: boolean;
	playsBanks?: boolean;
	playsBilliards?: boolean;
	playsOneCushion?: boolean;
	playsOnePocket?: boolean;
	playsPyramid?: boolean;
	playsSnooker?: boolean;
	playStraight?: boolean;
	talentLevel?: number;
}

/**
 * @class User
 * @package Model
 * @project ChalkySticks SDK Core
 */
@RelationshipProperties({
	autoCheckin: {
		key: 'autocheckin',
		relationship: 'profile',
	},
	biography: {
		key: 'brief_bio',
		relationship: 'profile',
	},
	hometown: {
		key: 'hometown',
		relationship: 'profile',
	},
	lastLocation: {
		key: 'last_location',
		relationship: 'profile',
	},
	plays8Ball: {
		key: '8ball',
		relationship: 'games',
		value: '8 Ball',
	},
	plays9Ball: {
		key: '9ball',
		relationship: 'games',
		value: '9 Ball',
	},
	plays10Ball: {
		key: '10ball',
		relationship: 'games',
		value: '10 Ball',
	},
	playsArtistic: {
		key: 'artistic',
		relationship: 'games',
		value: 'Trick Shots',
	},
	playsBanks: {
		key: 'banks',
		relationship: 'games',
		value: 'Bank Pool',
	},
	playsBilliards: {
		key: 'billiards',
		relationship: 'games',
		value: 'Billiards',
	},
	playsOneCushion: {
		key: 'onecushion',
		relationship: 'games',
		value: 'One Cushion',
	},
	playsOnePocket: {
		key: 'onepocket',
		relationship: 'games',
		value: 'One Pocket',
	},
	playsPyramid: {
		key: 'pyramid',
		relationship: 'games',
		value: 'Russian Pyramid',
	},
	playsSnooker: {
		key: 'snooker',
		relationship: 'games',
		value: 'Snooker',
	},
	playStraight: {
		key: 'straight',
		relationship: 'games',
		value: '14.1 Straight Pool',
	},
	talentLevel: {
		key: 'talent_level',
		relationship: 'profile',
	},
})
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

	public get avatar(): Model.Media {
		return (this.media.avatar as Model.Media) || new Model.Media();
	}

	public get comments(): Collection.Comment {
		return this.hasMany<Collection.Comment>('comments', Collection.Comment);
	}

	public get games(): Collection.Meta {
		return this.hasMany<Collection.Meta>('games', Collection.Meta);
	}

	public get lastCollection(): Model.Wallet {
		return this.hasOne<Model.Wallet>('last_collection', Model.Wallet);
	}

	public get media(): Collection.Media {
		return this.hasMany<Collection.Media>('media', Collection.Media);
	}

	public get profile(): Collection.Meta {
		return this.hasMany<Collection.Meta>('profile', Collection.Meta);
	}

	public get reactions(): Collection.Reaction {
		return this.hasMany<Collection.Reaction>('reactions', Collection.Reaction);
	}

	// endregion: Relationship

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * Get the user's profile biography
	 *
	 * @type string
	 */
	public getBiography(): string {
		return this.biography || '';
	}

	/**
	 * Get the user's profile hometown
	 *
	 * @type string
	 */
	public getHometown(): string {
		return this.hometown || '';
	}

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
	 * Get the user's talent level as int
	 *
	 * @type number
	 */
	public getTalentLevel(): number {
		return Number.isInteger(this.talentLevel) ? this.talentLevel || 0 : parseInt(String(this.talentLevel).trim(), 10) || 0;
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
