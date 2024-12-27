import { Base } from './Base.js';

/**
 * @class Geocode
 * @package Model
 * @project ChalkySticks SDK Core
 */
export class Geocode extends Base {
	// region: Static Methods
	// ---------------------------------------------------------------------------

	/**
	 * Search for address
	 *
	 * @param string address
	 * @return Promise<Geocode>
	 */
	public static async search(address: string): Promise<Geocode> {
		const geocode = new Geocode();
		await geocode.fetch({}, { address });
		return geocode;
	}

	// endregion: Static Methods

	/**
	 * Endpoint key
	 * e.g. https://api.chalkysticks.com/v1/data/geocode
	 *
	 * @type string
	 */
	public endpoint: string = 'data/geocode';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['status', 'results'];

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * Get formatted city and state
	 *
	 * @return string
	 */
	public getCityAndState(): string {
		const addressComponents = this.getAddressComponents();
		const city = addressComponents.find((comp) => comp.types.includes('locality'))?.long_name || '';
		const state = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))?.short_name || '';
		return `${city}, ${state}`;
	}

	/**
	 * Get the country
	 *
	 * @return string
	 */
	public getCountry(): string {
		const addressComponents = this.getAddressComponents();
		return addressComponents.find((comp) => comp.types.includes('country'))?.long_name || '';
	}

	/**
	 * Get fully qualified address
	 *
	 * @return string
	 */
	public getFullAddress(): string {
		const addressComponents = this.getAddressComponents();
		const streetNumber = addressComponents.find((comp) => comp.types.includes('street_number'))?.long_name || '';
		const route = addressComponents.find((comp) => comp.types.includes('route'))?.long_name || '';
		const locality = addressComponents.find((comp) => comp.types.includes('locality'))?.long_name || '';
		const administrativeArea = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '';
		const country = addressComponents.find((comp) => comp.types.includes('country'))?.long_name || '';
		const postalCode = addressComponents.find((comp) => comp.types.includes('postal_code'))?.long_name || '';

		return `${streetNumber} ${route}, ${locality}, ${administrativeArea}, ${country}, ${postalCode}`.trim().replace(/,\s*$/, '');
	}

	/**
	 * Get the location
	 *
	 * @return IGeoLocation
	 */
	public getLocation(): IGeoLocation {
		let latitude = 0;
		let longitude = 0;

		if (this.hasResults()) {
			const results = this.getResults();
			const location = results[0].geometry.location;

			latitude = location.lat;
			longitude = location.lng;
		}

		return {
			latitude,
			longitude,
		};
	}

	/**
	 * Google's Geocode API results
	 *
	 * @return any
	 */
	public getResults(): any {
		return this.attr('results') as any;
	}

	/**
	 * Get short address
	 *
	 * @return string
	 */
	public getShortAddress(): string {
		const addressComponents = this.getAddressComponents();
		const streetNumber = addressComponents.find((comp) => comp.types.includes('street_number'))?.short_name || '';
		const route = addressComponents.find((comp) => comp.types.includes('route'))?.short_name || '';
		const locality = addressComponents.find((comp) => comp.types.includes('locality'))?.short_name || '';
		const administrativeArea = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))?.short_name || '';
		const country = addressComponents.find((comp) => comp.types.includes('country'))?.short_name || '';
		const postalCode = addressComponents.find((comp) => comp.types.includes('postal_code'))?.short_name || '';

		return `${streetNumber} ${route}, ${locality}, ${administrativeArea}, ${country}, ${postalCode}`.trim().replace(/,\s*$/, '');
	}

	/**
	 * Google's Geocode API status
	 *
	 * @return string
	 */
	public getStatus(): string {
		return this.attributes.status || '';
	}

	/**
	 * Check if results are available
	 *
	 * @return boolean
	 */
	public hasResults(): boolean {
		const results = this.getResults();
		return results && results[0] && results[0].geometry;
	}

	/**
	 * Status was successful
	 *
	 * @return boolean
	 */
	public isOK(): boolean {
		return this.getStatus() === 'OK';
	}

	/**
	 * Get address components
	 *
	 * @return google.maps.GeocoderAddressComponent[]
	 */
	private getAddressComponents(): google.maps.GeocoderAddressComponent[] {
		return this.getResults()[0].address_components;
	}

	// endregion: Getters
}
