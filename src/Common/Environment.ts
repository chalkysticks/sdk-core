
/**
 *  ┌────────────────────────────────────────────────────────────────────────────┐
 *  │                                                                            │
 *  │ Global Environment Class                                                   │
 *  │                                                                            │
 *  └────────────────────────────────────────────────────────────────────────────┘
 */
export default class Environment {
    /**
     * @type IEnvironmentApplication
     */
    public static app: IEnvironmentApplication = Environment.getVariable('app', {
        api_url: 'http://localhost:8000/api/v1',
        limit: 32
    });

    /**
     * If our server asks for debug mode
     *
     * @type boolean
     */
    public static debug: boolean = Environment.getVariable('debug', false);

    /**
     * Environment
     *
     * @type string
     */
    public static env: string = Environment.getVariable('env', 'development');

    /**
     * Google Options
     *
     * @type IEnvironmentGoogle
     */
    public static google: IEnvironmentGoogle = Environment.getVariable('google', {
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
    public static isLocal(): boolean {
        return Environment.env === 'local' || Environment.env === 'development';
    }

    /**
     * Check environment type
     *
     * @return boolean
     */
    public static isProduction(): boolean {
        return Environment.env === 'production';
    }

    /**
     * Check environment type
     *
     * @return boolean
     */
    public static isStaging(): boolean {
        return Environment.env === 'staging';
    }

    /**
     * Where we should get defaults from
     *
     * @return any
     */
    private static getVariable(key: string, defaults: any) {
        // @ts-ignore
        return window && window.env ? window.env[key] : defaults;
    }
}
