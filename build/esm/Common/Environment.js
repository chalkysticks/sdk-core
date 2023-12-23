class Environment {
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
export default Environment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tbW9uL0Vudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQXFCLFdBQVc7SUF3Q3JCLE1BQU0sQ0FBQyxPQUFPO1FBQ2pCLE9BQU8sV0FBVyxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksV0FBVyxDQUFDLEdBQUcsS0FBSyxhQUFhLENBQUM7SUFDNUUsQ0FBQztJQU9NLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sV0FBVyxDQUFDLEdBQUcsS0FBSyxZQUFZLENBQUM7SUFDNUMsQ0FBQztJQU9NLE1BQU0sQ0FBQyxTQUFTO1FBQ25CLE9BQU8sV0FBVyxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUM7SUFDekMsQ0FBQztJQU9PLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBVyxFQUFFLFFBQWE7UUFDakQsTUFBTSxNQUFNLEdBQUcsT0FBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsSUFBSyxNQUFjLENBQUMsS0FBSyxDQUFDO1lBQ2hFLENBQUMsQ0FBRSxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzdCLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFFckIsT0FBTyxNQUFNLENBQUM7SUFDWixDQUFDOztBQXJFYSxlQUFHLEdBQVEsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7SUFDcEQsT0FBTyxFQUFFLDhCQUE4QjtJQUN2QyxLQUFLLEVBQUUsRUFBRTtDQUNaLENBQUMsQ0FBQztBQU9XLGlCQUFLLEdBQVksV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFPekQsZUFBRyxHQUFXLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBTzVELGtCQUFNLEdBQVEsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7SUFDMUQsU0FBUyxFQUFFO1FBQ1AsRUFBRSxFQUFFLFdBQVc7S0FDbEI7SUFDRCxPQUFPLEVBQUUsV0FBVztDQUN2QixDQUFDLENBQUM7ZUFqQ2MsV0FBVyJ9