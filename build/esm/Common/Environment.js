export class Environment {
    static { this.app = Environment.getVariable('app', {
        api_url: 'http://localhost:8000/api/v1',
        limit: 32,
    }); }
    static { this.debug = Environment.getVariable('debug', false); }
    static { this.env = Environment.getVariable('env', 'development'); }
    static { this.google = Environment.getVariable('google', {
        analytics: {
            id: 'UA-189...',
        },
        api_key: 'AIzaSy...',
    }); }
    static isLocal() {
        return Environment.env === 'local' || Environment.env === 'development';
    }
    static isProduction() {
        return Environment.env === 'production';
    }
    static isStaging() {
        return Environment.env === 'staging';
    }
    static getVariable(key, defaults) {
        const output = typeof window === 'object' && window['env'] ? window['env'][key] : defaults;
        return output;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sT0FBTyxXQUFXO2FBSVQsUUFBRyxHQUFRLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZELE9BQU8sRUFBRSw4QkFBOEI7UUFDdkMsS0FBSyxFQUFFLEVBQUU7S0FDVCxDQUFDLENBQUM7YUFPVyxVQUFLLEdBQVksV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFPekQsUUFBRyxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBTzVELFdBQU0sR0FBUSxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUM3RCxTQUFTLEVBQUU7WUFDVixFQUFFLEVBQUUsV0FBVztTQUNmO1FBQ0QsT0FBTyxFQUFFLFdBQVc7S0FDcEIsQ0FBQyxDQUFDO0lBT0ksTUFBTSxDQUFDLE9BQU87UUFDcEIsT0FBTyxXQUFXLENBQUMsR0FBRyxLQUFLLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQztJQUN6RSxDQUFDO0lBT00sTUFBTSxDQUFDLFlBQVk7UUFDekIsT0FBTyxXQUFXLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQztJQUN6QyxDQUFDO0lBT00sTUFBTSxDQUFDLFNBQVM7UUFDdEIsT0FBTyxXQUFXLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQztJQUN0QyxDQUFDO0lBT08sTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFXLEVBQUUsUUFBYTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUssTUFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUU3RyxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUMifQ==