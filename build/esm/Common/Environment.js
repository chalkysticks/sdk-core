/**
 * @class Environment
 * @package Common
 * @project ChalkySticks SDK Core
 */
export default class Environment {
    /**
     * @type IEnvironmentApplication
     */
    static app = Environment.getVariable('app', {
        api_url: 'http://localhost:8000/api/v1',
        limit: 32
    });
    /**
     * If our server asks for debug mode
     *
     * @type boolean
     */
    static debug = Environment.getVariable('debug', false);
    /**
     * Environment
     *
     * @type string
     */
    static env = Environment.getVariable('env', 'development');
    /**
     * Google Options
     *
     * @type IEnvironmentGoogle
     */
    static google = Environment.getVariable('google', {
        analytics: {
            id: 'UA-189...'
        },
        api_key: 'AIzaSy...',
    });
    /**
     * Check environment type
     *
     * @return boolean
     */
    static isLocal() {
        return Environment.env === 'local' || Environment.env === 'development';
    }
    /**
     * Check environment type
     *
     * @return boolean
     */
    static isProduction() {
        return Environment.env === 'production';
    }
    /**
     * Check environment type
     *
     * @return boolean
     */
    static isStaging() {
        return Environment.env === 'staging';
    }
    /**
     * Where we should get defaults from
     *
     * @return any
     */
    static getVariable(key, defaults) {
        const output = typeof (window) === 'object' && window['env']
            ? window['env'][key]
            : defaults;
        return output;
    }
}
