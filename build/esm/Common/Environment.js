export default class Environment {
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
        const output = typeof (window) === 'object' && window['env']
            ? window['env'][key]
            : defaults;
        return output;
    }
}
Environment.app = Environment.getVariable('app', {
    api_url: 'http://localhost:8000/api/v1',
    limit: 32
});
Environment.debug = Environment.getVariable('debug', false);
Environment.env = Environment.getVariable('env', 'development');
Environment.google = Environment.getVariable('google', {
    analytics: {
        id: 'UA-189...'
    },
    api_key: 'AIzaSy...',
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBVztJQXdDckIsTUFBTSxDQUFDLE9BQU87UUFDakIsT0FBTyxXQUFXLENBQUMsR0FBRyxLQUFLLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxLQUFLLGFBQWEsQ0FBQztJQUM1RSxDQUFDO0lBT00sTUFBTSxDQUFDLFlBQVk7UUFDdEIsT0FBTyxXQUFXLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQztJQUM1QyxDQUFDO0lBT00sTUFBTSxDQUFDLFNBQVM7UUFDbkIsT0FBTyxXQUFXLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQztJQUN6QyxDQUFDO0lBT08sTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFXLEVBQUUsUUFBYTtRQUNqRCxNQUFNLE1BQU0sR0FBRyxPQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssUUFBUSxJQUFLLE1BQWMsQ0FBQyxLQUFLLENBQUM7WUFDaEUsQ0FBQyxDQUFFLE1BQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDN0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUVyQixPQUFPLE1BQU0sQ0FBQztJQUNaLENBQUM7O0FBckVhLGVBQUcsR0FBNEIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7SUFDeEUsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsRUFBRTtDQUNaLENBQUMsQ0FBQztBQU9XLGlCQUFLLEdBQVksV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFPekQsZUFBRyxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBTzVELGtCQUFNLEdBQXVCLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO0lBQ3pFLFNBQVMsRUFBRTtRQUNQLEVBQUUsRUFBRSxXQUFXO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFLFdBQVc7Q0FDdkIsQ0FBQyxDQUFDIn0=