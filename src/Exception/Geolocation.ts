/**
 * @class Geolocation
 * @package Exception
 * @project ChalkySticks SDK Core
 */
export class Geolocation extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'GeolocationError';
	}
}
