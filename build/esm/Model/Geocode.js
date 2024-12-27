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
    getCityAndState() {
        const addressComponents = this.getAddressComponents();
        const city = addressComponents.find((comp) => comp.types.includes('locality'))?.long_name || '';
        const state = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))?.short_name || '';
        return `${city}, ${state}`;
    }
    getCountry() {
        const addressComponents = this.getAddressComponents();
        return addressComponents.find((comp) => comp.types.includes('country'))?.long_name || '';
    }
    getFullAddress() {
        const addressComponents = this.getAddressComponents();
        const streetNumber = addressComponents.find((comp) => comp.types.includes('street_number'))?.long_name || '';
        const route = addressComponents.find((comp) => comp.types.includes('route'))?.long_name || '';
        const locality = addressComponents.find((comp) => comp.types.includes('locality'))?.long_name || '';
        const administrativeArea = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '';
        const country = addressComponents.find((comp) => comp.types.includes('country'))?.long_name || '';
        const postalCode = addressComponents.find((comp) => comp.types.includes('postal_code'))?.long_name || '';
        return `${streetNumber} ${route}, ${locality}, ${administrativeArea}, ${country}, ${postalCode}`.trim().replace(/,\s*$/, '');
    }
    getLocation() {
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
    getResults() {
        return this.attr('results');
    }
    getShortAddress() {
        const addressComponents = this.getAddressComponents();
        const streetNumber = addressComponents.find((comp) => comp.types.includes('street_number'))?.short_name || '';
        const route = addressComponents.find((comp) => comp.types.includes('route'))?.short_name || '';
        const locality = addressComponents.find((comp) => comp.types.includes('locality'))?.short_name || '';
        const administrativeArea = addressComponents.find((comp) => comp.types.includes('administrative_area_level_1'))?.short_name || '';
        const country = addressComponents.find((comp) => comp.types.includes('country'))?.short_name || '';
        const postalCode = addressComponents.find((comp) => comp.types.includes('postal_code'))?.short_name || '';
        return `${streetNumber} ${route}, ${locality}, ${administrativeArea}, ${country}, ${postalCode}`.trim().replace(/,\s*$/, '');
    }
    getStatus() {
        return this.attributes.status || '';
    }
    hasResults() {
        const results = this.getResults();
        return results && results[0] && results[0].geometry;
    }
    isOK() {
        return this.getStatus() === 'OK';
    }
    getAddressComponents() {
        return this.getResults()[0].address_components;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2VvY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbC9HZW9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPakMsTUFBTSxPQUFPLE9BQVEsU0FBUSxJQUFJO0lBQWpDOztRQXdCUSxhQUFRLEdBQVcsY0FBYyxDQUFDO1FBT2xDLFdBQU0sR0FBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztJQW1JakQsQ0FBQztJQXhKTyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFlO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDOUIsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQTJCTSxlQUFlO1FBQ3JCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDaEcsTUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQztRQUNySCxPQUFPLEdBQUcsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFPTSxVQUFVO1FBQ2hCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixF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