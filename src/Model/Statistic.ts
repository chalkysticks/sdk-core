import { Base } from './Base';

/**
 * @class Statistic
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Statistic extends Base {
	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v3/statistics
	 *
	 * @type string
	 */
	public endpoint: string = 'statistics';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['beacon_count', 'city_count', 'venue_count', 'user_count', 'video_duration_as_minutes', 'video_duration_as_hours'];

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return number
	 */
	public getBeaconCount(): number {
		return this.attr('beacon_count') as number;
	}

	/**
	 * @return number
	 */
	public getCityCount(): number {
		return this.attr('city_count') as number;
	}

	/**
	 * @return number
	 */
	public getVenueCount(): number {
		return this.attr('venue_count') as number;
	}

	/**
	 * @return number
	 */
	public getUserCount(): number {
		return this.attr('user_count') as number;
	}

	/**
	 * @return number
	 */
	public getVideoDurationAsMinutes(): number {
		return this.attr('video_duration_as_minutes') as number;
	}

	/**
	 * @return number
	 */
	public getVideoDurationAsHours(): number {
		return this.attr('video_duration_as_hours') as number;
	}

	// endregion: Getters
}
