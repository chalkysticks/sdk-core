import { Base } from './Base.js';
export class Geocode extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'data/geocode';
        this.fields = ['status', 'results'];
    }
    static async search(address) {
        const geocode = new Geocode();
        await geocode.fetch({}, { address });
        return geocode;
    }
    static async searchByCoordinates(latitude, longitude) {
        const geocode = new Geocode();
        await geocode.fetch({}, { latlng: `${latitude},${longitude}` });
        return geocode;
    }
    getCity(useShortName = false) {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('locality'));
        return component ? (useShortName ? component.short_name : component.long_name) : '';
    }
    getState(useShortName = false) {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'));
        return component ? (useShortName ? component.short_name : component.long_name) : '';
    }
    getStateShortCode() {
        return this.getState(true);
    }
    getCityAndState(useShortStateCode = true) {
        const city = this.getCity();
        const state = useShortStateCode ? this.getStateShortCode() : this.getState();
        return city && state ? `${city}, ${state}` : '';
    }
    getZipCode() {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('postal_code'));
        return component ? component.long_name : '';
    }
    getStreetNumber() {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('street_number'));
        return component ? component.long_name : '';
    }
    getStreetName() {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('route'));
        return component ? component.long_name : '';
    }
    getStreetAddress() {
        const streetNumber = this.getStreetNumber();
        const streetName = this.getStreetName();
        return streetNumber && streetName ? `${streetNumber} ${streetName}` : streetName || '';
    }
    getNeighborhood() {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('neighborhood') || comp.types.includes('sublocality_level_1'));
        return component ? component.long_name : '';
    }
    getCounty() {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('administrative_area_level_2'));
        return component ? component.long_name : '';
    }
    getCountry(useShortCode = false) {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes('country'));
        return component ? (useShortCode ? component.short_name : component.long_name) : '';
    }
    getCountryCode() {
        return this.getCountry(true);
    }
    getFullAddress() {
        const streetAddress = this.getStreetAddress();
        const city = this.getCity();
        const state = this.getState();
        const country = this.getCountry();
        const zipCode = this.getZipCode();
        return [streetAddress, [city, state].filter(Boolean).join(', '), country, zipCode].filter(Boolean).join(', ');
    }
    getShortAddress() {
        const streetAddress = this.getStreetAddress();
        const city = this.getCity(true);
        const state = this.getStateShortCode();
        const country = this.getCountryCode();
        const zipCode = this.getZipCode();
        return [streetAddress, [city, state].filter(Boolean).join(', '), country, zipCode].filter(Boolean).join(', ');
    }
    getAddressComponentByType(type, useShortName = false) {
        const addressComponents = this.getAddressComponents();
        const component = addressComponents.find((comp) => comp.types.includes(type));
        return component ? (useShortName ? component.short_name : component.long_name) : '';
    }
    getLocation() {
        return {
            latitude: this.getLatitude(),
            longitude: this.getLongitude(),
        };
    }
    getLatitude() {
        if (!this.hasResults()) {
            return 0;
        }
        const results = this.getResults();
        const location = results[0].geometry.location;
        if (typeof location.lat === 'function') {
            return location.lat() || 0;
        }
        return location.lat || 0;
    }
    getLongitude() {
        if (!this.hasResults()) {
            return 0;
        }
        const results = this.getResults();
        const location = results[0].geometry.location;
        if (typeof location.lng === 'function') {
            return location.lng() || 0;
        }
        return location.lng || 0;
    }
    getCoordinatesString(precision = 6) {
        const location = this.getLocation();
        return `${location.latitude.toFixed(precision)}, ${location.longitude.toFixed(precision)}`;
    }
    getLocationType() {
        if (!this.hasResults()) {
            return '';
        }
        const results = this.getResults();
        return results[0].geometry.location_type || '';
    }
    getViewport() {
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
    getFormattedAddress() {
        if (!this.hasResults()) {
            return '';
        }
        const results = this.getResults();
        return results[0].formatted_address || '';
    }
    getPlaceId() {
        if (!this.hasResults()) {
            return '';
        }
        const results = this.getResults();
        return results[0].place_id || '';
    }
    getResults() {
        return this.attr('results') || [];
    }
    getStatus() {
        return this.attributes.status || '';
    }
    getErrorMessage() {
        if (this.isOK()) {
            return '';
        }
        const errorMessages = {
            INVALID_REQUEST: 'Invalid request parameters',
            OVER_DAILY_LIMIT: 'API key is over quota',
            OVER_QUERY_LIMIT: 'Too many requests, try again later',
            REQUEST_DENIED: 'Request was denied',
            UNKNOWN_ERROR: 'Server error, try again later',
            ZERO_RESULTS: 'No results found for this address',
        };
        return errorMessages[this.getStatus()] || 'Unknown error occurred';
    }
    hasResults() {
        const results = this.getResults();
        return Array.isArray(results) && results.length > 0 && !!results[0]?.geometry;
    }
    isOK() {
        return this.getStatus() === 'OK';
    }
    isInCountry(countryCode) {
        return this.getCountryCode().toUpperCase() === countryCode.toUpperCase();
    }
    isInState(stateCode) {
        return this.getStateShortCode().toUpperCase() === stateCode.toUpperCase();
    }
    getAddressComponents() {
        if (!this.hasResults()) {
            return [];
        }
        return this.getResults()[0].address_components || [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9HZW9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFrQmpDLE1BQU0sT0FBTyxPQUFRLFNBQVEsSUFBSTtJQUFqQzs7UUF1Q1EsYUFBUSxHQUFXLGNBQWMsQ0FBQztRQU9sQyxXQUFNLEdBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFrYmpELENBQUM7SUF0ZE8sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBZTtRQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzlCLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFTTSxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsU0FBaUI7UUFDMUUsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsUUFBUSxJQUFJLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVoRSxPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBNEJNLE9BQU8sQ0FBQyxlQUF3QixLQUFLO1FBQzNDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdEQsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRXBGLE9BQU8sU0FBUyxDQUFDLENB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