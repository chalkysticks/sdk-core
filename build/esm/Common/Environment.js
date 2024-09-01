export class Environment {
    constructor() {
        this.id = Math.random().toString(36).substr(2, 9);
    }
    get app() {
        return singleton.getVariable('app', {
            api_url: '',
            limit: 32,
        });
    }
    get debug() {
        return singleton.getVariable('debug', false);
    }
    get env() {
        return singleton.getVariable('env', 'development');
    }
    get google() {
        return singleton.getVariable('google', {
            analytics: {
                id: '',
            },
            api_key: '',
        });
    }
    isLocal() {
        return singleton.env === 'local' || singleton.env === 'development';
    }
    isProduction() {
        return singleton.env === 'production';
    }
    isStaging() {
        return singleton.env === 'staging';
    }
    getVariable(key, defaults) {
        const output = typeof window === 'object' && window['env'] ? window['env'][key] : defaults;
        return output;
    }
}
const singleton = new Environment();
export default singleton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBZ0RRLE9BQUUsR0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUF1QzdELENBQUM7SUFuRkEsSUFBVyxHQUFHO1FBQ2IsT0FBTyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUNuQyxPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxFQUFFO1NBQ1QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQU9ELElBQVcsS0FBSztRQUNmLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQU9ELElBQVcsR0FBRztRQUNiLE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQU9ELElBQVcsTUFBTTtRQUNoQixPQUFPLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3RDLFNBQVMsRUFBRTtnQkFDVixFQUFFLEVBQUUsRUFBRTthQUNOO1lBQ0QsT0FBTyxFQUFFLEVBQUU7U0FDWCxDQUFDLENBQUM7SUFDSixDQUFDO0lBY00sT0FBTztRQUNiLE9BQU8sU0FBUyxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksU0FBUyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUM7SUFDckUsQ0FBQztJQU9NLFlBQVk7UUFDbEIsT0FBTyxTQUFTLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQztJQUN2QyxDQUFDO0lBT00sU0FBUztRQUNmLE9BQU8sU0FBUyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUM7SUFDcEMsQ0FBQztJQU9PLFdBQVcsQ0FBQyxHQUFXLEVBQUUsUUFBYTtRQUM3QyxNQUFNLE1BQU0sR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUssTUFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUU3RyxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7Q0FDRDtBQUdELE1BQU0sU0FBUyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDcEMsZUFBZSxTQUFTLENBQUMifQ==