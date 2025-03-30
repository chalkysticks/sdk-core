import { Base } from './Base.js';

/**
 * Interface for geographic location coordinates
 *
 * @interface IGeoLocation
 */
interface IGeoLocation {
	latitude: number;
	longitude: number;
}

/**
 * @class Geocode
 * @package Model
 * @project ChalkySticks SDK Core
 * @description Handles geocoding operations and address component extraction
 */
export class Geocode extends Base {
	// region: Static Methods
	// ---------------------------------------------------------------------------

	/**
	 * Search for address
	 *
	 * @param string address - The address to geocode
	 * @return Promise<Geocode> - A Promise that resolves to a Geocode instance
	 */
	public static async search(address: string): Promise<Geocode> {
		const geocode = new Geocode();
		await geocode.fetch({}, { address });

		return geocode;
	}

	/**
	 * Search for a location by coordinates
	 *
	 * @param number latitude - The latitude coordinate
	 * @param number longitude - The longitude coordinate
	 * @return Promise<Geocode> - A Promise that resolves to a Geocode instance
	 */
	public static async searchByCoordinates(latitude: number, longitude: number): Promise<Geocode> {
		const geocode = new Geocode();
		await geocode.fetch({}, { latlng: `${latitude},${longitude}` });

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

	// region: Address Component Getters
	// ---------------------------------------------------------------------------

	/**
	 * Get city (locality) name
	 *
	 * @param boolean useShortName - Whether to use the short name instead of long name
	 * @return string - The city name or empty string if not found
	 */
	public getCity(useShortName: boolean = false): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('locality'));

		return component ? (useShortName ? component.short_name : component.long_name) : '';
	}

	/**
	 * Get state (administrative area level 1) name
	 *
	 * @param boolean useShortName - Whether to use the short name instead of long name
	 * @return string - The state name or empty string if not found
	 */
	public getState(useShortName: boolean = false): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'));

		return component ? (useShortName ? component.short_name : component.long_name) : '';
	}

	/**
	 * Get state short code (e.g. "NY" for New York)
	 *
	 * @return string - The state short code or empty string if not found
	 */
	public getStateShortCode(): string {
		return this.getState(true);
	}

	/**
	 * Get formatted city and state
	 *
	 * @param boolean useShortStateCode - Whether to use state short code
	 * @return string - Formatted city and state (e.g. "New York, NY")
	 */
	public getCityAndState(useShortStateCode: boolean = true): string {
		const city = this.getCity();
		const state = useShortStateCode ? this.getStateShortCode() : this.getState();

		return city && state ? `${city}, ${state}` : '';
	}

	/**
	 * Get zip/postal code
	 *
	 * @return string - The postal code or empty string if not found
	 */
	public getZipCode(): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('postal_code'));

		return component ? component.long_name : '';
	}

	/**
	 * Get street number
	 *
	 * @return string - The street number or empty string if not found
	 */
	public getStreetNumber(): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('street_number'));

		return component ? component.long_name : '';
	}

	/**
	 * Get street name (route)
	 *
	 * @return string - The street name or empty string if not found
	 */
	public getStreetName(): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('route'));

		return component ? component.long_name : '';
	}

	/**
	 * Get full street address (number + street name)
	 *
	 * @return string - The full street address
	 */
	public getStreetAddress(): string {
		const streetNumber = this.getStreetNumber();
		const streetName = this.getStreetName();

		return streetNumber && streetName ? `${streetNumber} ${streetName}` : streetName || '';
	}

	/**
	 * Get neighborhood
	 *
	 * @return string - The neighborhood or empty string if not found
	 */
	public getNeighborhood(): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('neighborhood') || comp.types.includes('sublocality_level_1'));

		return component ? component.long_name : '';
	}

	/**
	 * Get county (administrative area level 2)
	 *
	 * @return string - The county or empty string if not found
	 */
	public getCounty(): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('administrative_area_level_2'));

		return component ? component.long_name : '';
	}

	/**
	 * Get country
	 *
	 * @param boolean useShortCode - Whether to use the country code instead of full name
	 * @return string - The country name or empty string if not found
	 */
	public getCountry(useShortCode: boolean = false): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes('country'));

		return component ? (useShortCode ? component.short_name : component.long_name) : '';
	}

	/**
	 * Get country code (e.g. "US" for United States)
	 *
	 * @return string - The country code or empty string if not found
	 */
	public getCountryCode(): string {
		return this.getCountry(true);
	}

	/**
	 * Get fully qualified address
	 *
	 * @return string - The full address
	 */
	public getFullAddress(): string {
		const streetAddress = this.getStreetAddress();
		const city = this.getCity();
		const state = this.getState();
		const country = this.getCountry();
		const zipCode = this.getZipCode();

		return [streetAddress, [city, state].filter(Boolean).join(', '), country, zipCode].filter(Boolean).join(', ');
	}

	/**
	 * Get short address (using short codes where possible)
	 *
	 * @return string - The shortened address
	 */
	public getShortAddress(): string {
		const streetAddress = this.getStreetAddress();
		const city = this.getCity(true);
		const state = this.getStateShortCode();
		const country = this.getCountryCode();
		const zipCode = this.getZipCode();

		return [streetAddress, [city, state].filter(Boolean).join(', '), country, zipCode].filter(Boolean).join(', ');
	}

	/**
	 * Get a specific address component by type
	 *
	 * @param string type - The address component type to find
	 * @param boolean useShortName - Whether to use the short name instead of long name
	 * @return string - The component value or empty string if not found
	 */
	public getAddressComponentByType(type: string, useShortName: boolean = false): string {
		const addressComponents = this.getAddressComponents();
		const component = addressComponents.find((comp) => comp.types.includes(type));
		return component ? (useShortName ? component.short_name : component.long_name) : '';
	}

	// endregion: Address Component Getters

	// region: Location and Status Getters
	// ---------------------------------------------------------------------------

	/**
	 * Get the location coordinates
	 *
	 * @return IGeoLocation - Object containing latitude and longitude
	 */
	public getLocation(): IGeoLocation {
		return {
			latitude: this.getLatitude(),
			longitude: this.getLongitude(),
		};
	}

	/**
	 * Get the latitude coordinate
	 *
	 * @return number - The latitude coordinate or 0 if not available
	 */
	public getLatitude(): number {
		if (!this.hasResults()) {
			return 0;
		}

		const results = this.getResults();
		const location = results[0].geometry.location;

		// Handle both function and property access (Google Maps API can return either)
		if (typeof location.lat === 'function') {
			return location.lat() || 0;
		}

		return location.lat || 0;
	}

	/**
	 * Get the longitude coordinate
	 *
	 * @return number - The longitude coordinate or 0 if not available
	 */
	public getLongitude(): number {
		if (!this.hasResults()) {
			return 0;
		}

		const results = this.getResults();
		const location = results[0].geometry.location;

		// Handle both function and property access (Google Maps API can return either)
		if (typeof location.lng === 'function') {
			return location.lng() || 0;
		}

		return location.lng || 0;
	}

	/**
	 * Get formatted coordinates string
	 *
	 * @param number precision - Number of decimal places to include
	 * @return string - Formatted coordinates string (e.g. "40.7128, -74.0060")
	 */
	public getCoordinatesString(precision: number = 6): string {
		const location = this.getLocation();
		return `${location.latitude.toFixed(precision)}, ${location.longitude.toFixed(precision)}`;
	}

	/**
	 * Get the location type (e.g. ROOFTOP, RANGE_INTERPOLATED, etc.)
	 *
	 * @return string - The location type or empty string if not available
	 */
	public getLocationType(): string {
		if (!this.hasResults()) {
			return '';
		}

		const results = this.getResults();
		return results[0].geometry.location_type || '';
	}

	/**
	 * Get the viewport boundaries for the location
	 *
	 * @return {northeast: IGeoLocation, southwest: IGeoLocation} | null - Viewport boundaries or null if not available
	 */
	public getViewport(): { northeast: IGeoLocation; southwest: IGeoLocation } | null {
		if (!this.hasResults()) {
			return null;
		}

		const results = this.getResults();
		const viewport = results[0].geometry.viewport;

		if (!viewport) {
			return null;
		}

		return {
			northeast: {
				latitude: viewport.northeast.lat,
				longitude: viewport.northeast.lng,
			},
			southwest: {
				latitude: viewport.southwest.lat,
				longitude: viewport.southwest.lng,
			},
		};
	}

	/**
	 * Get formatted address from the API response
	 *
	 * @return string - The formatted address from the API or empty string if not available
	 */
	public getFormattedAddress(): string {
		if (!this.hasResults()) {
			return '';
		}

		const results = this.getResults();
		return results[0].formatted_address || '';
	}

	/**
	 * Get place ID from the API response
	 *
	 * @return string - The place ID or empty string if not available
	 */
	public getPlaceId(): string {
		if (!this.hasResults()) {
			return '';
		}

		const results = this.getResults();
		return results[0].place_id || '';
	}

	/**
	 * Google's Geocode API results
	 *
	 * @return any[] - The raw results array
	 */
	public getResults(): any[] {
		return (this.attr('results') as any) || [];
	}

	/**
	 * Google's Geocode API status
	 *
	 * @return string - The API response status
	 */
	public getStatus(): string {
		return this.attributes.status || '';
	}

	/**
	 * Get any error message associated with the API response
	 *
	 * @return string - Error message or empty string if no error
	 */
	public getErrorMessage(): string {
		if (this.isOK()) {
			return '';
		}

		const errorMessages: { [key: string]: string } = {
			INVALID_REQUEST: 'Invalid request parameters',
			OVER_DAILY_LIMIT: 'API key is over quota',
			OVER_QUERY_LIMIT: 'Too many requests, try again later',
			REQUEST_DENIED: 'Request was denied',
			UNKNOWN_ERROR: 'Server error, try again later',
			ZERO_RESULTS: 'No results found for this address',
		};

		return errorMessages[this.getStatus()] || 'Unknown error occurred';
	}

	// endregion: Location and Status Getters

	// region: Status Checkers
	// ---------------------------------------------------------------------------

	/**
	 * Check if results are available
	 *
	 * @return boolean - True if results are available
	 */
	public hasResults(): boolean {
		const results = this.getResults();
		return Array.isArray(results) && results.length > 0 && !!results[0]?.geometry;
	}

	/**
	 * Status was successful
	 *
	 * @return boolean - True if the API request was successful
	 */
	public isOK(): boolean {
		return this.getStatus() === 'OK';
	}

	/**
	 * Check if the location is in a specific country
	 *
	 * @param string countryCode - The country code to check (e.g., "US")
	 * @return boolean - True if the location is in the specified country
	 */
	public isInCountry(countryCode: string): boolean {
		return this.getCountryCode().toUpperCase() === countryCode.toUpperCase();
	}

	/**
	 * Check if the location is in a specific state
	 *
	 * @param string stateCode - The state code to check (e.g., "NY")
	 * @return boolean - True if the location is in the specified state
	 */
	public isInState(stateCode: string): boolean {
		return this.getStateShortCode().toUpperCase() === stateCode.toUpperCase();
	}

	// endregion: Status Checkers

	// region: Private Methods
	// ---------------------------------------------------------------------------

	/**
	 * Get address components from the API results
	 *
	 * @return google.maps.GeocoderAddressComponent[] - Array of address components
	 */
	private getAddressComponents(): google.maps.GeocoderAddressComponent[] {
		if (!this.hasResults()) {
			return [];
		}

		return this.getResults()[0].address_components || [];
	}

	// endregion: Private Methods
}
