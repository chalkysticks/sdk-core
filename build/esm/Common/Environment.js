export class Environment {
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
Environment.app = Environment.getVariable('app', {
    api_url: 'http://localhost:8000/api/v1',
    limit: 32,
});
Environment.debug = Environment.getVariable('debug', false);
Environment.env = Environment.getVariable('env', 'development');
Environment.google = Environment.getVariable('google', {
    analytics: {
        id: 'UA-189...',
    },
    api_key: 'AIzaSy...',
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sT0FBTyxXQUFXO0lBd0NoQixNQUFNLENBQUMsT0FBTztRQUNwQixPQUFPLFdBQVcsQ0FBQyxHQUFHLEtBQUssT0FBTyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDO0lBQ3pFLENBQUM7SUFPTSxNQUFNLENBQUMsWUFBWTtRQUN6QixPQUFPLFdBQVcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDO0lBQ3pDLENBQUM7SUFPTSxNQUFNLENBQUMsU0FBUztRQUN0QixPQUFPLFdBQVcsQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFPTyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQVcsRUFBRSxRQUFhO1FBQ3BELE1BQU0sTUFBTSxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSyxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFFLE1BQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRTdHLE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQzs7QUFuRWEsZUFBRyxHQUFRLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO0lBQ3ZELE9BQU8sRUFBRSw4QkFBOEI7SUFDdkMsS0FBSyxFQUFFLEVBQUU7Q0FDVCxDQUFDLENBQUM7QUFPVyxpQkFBSyxHQUFZLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBT3pELGVBQUcsR0FBVyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztBQU81RCxrQkFBTSxHQUFRLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO0lBQzdELFNBQVMsRUFBRTtRQUNWLEVBQUUsRUFBRSxXQUFXO0tBQ2Y7SUFDRCxPQUFPLEVBQUUsV0FBVztDQUNwQixDQUFDLENBQUMifQ==