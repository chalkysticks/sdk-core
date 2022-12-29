export default class Environment {
    static app = Environment.getVariable('app', {
        api_url: 'http://localhost:8000/api/v1',
        limit: 32
    });
    static debug = Environment.getVariable('debug', false);
    static env = Environment.getVariable('env', 'development');
    static google = Environment.getVariable('google', {
        analytics: {
            id: 'UA-189...'
        },
        api_key: 'AIzaSy...',
    });
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
//# sourceMappingURL=Environment.js.map