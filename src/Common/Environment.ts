/**
 * @class Environment
 * @package Common
 * @project ChalkySticks SDK Core
 */
export class Environment {
	/**
	 * @type IEnvironmentApplication
	 */
	public get app(): any {
		return singleton.getVariable('app', {
			api_url: '',
			limit: 32,
		});
	}

	/**
	 * If our server asks for debug mode
	 *
	 * @type boolean
	 */
	public get debug(): boolean {
		return singleton.getVariable('debug', false);
	}

	/**
	 * Environment
	 *
	 * @type string
	 */
	public get env(): string {
		return singleton.getVariable('env', 'development');
	}

	/**
	 * Google Options
	 *
	 * @type IEnvironmentGoogle
	 */
	public get google(): any {
		return singleton.getVariable('google', {
			analytics: {
				id: '',
			},
			api_key: '',
		});
	}

	/**
	 * Unique ID for this class
	 *
	 * @type string
	 */
	public id: string = Math.random().toString(36).substr(2, 9);

	/**
	 * Check environment type
	 *
	 * @return boolean
	 */
	public isLocal(): boolean {
		return singleton.env === 'local' || singleton.env === 'development';
	}

	/**
	 * Check environment type
	 *
	 * @return boolean
	 */
	public isProduction(): boolean {
		return singleton.env === 'production';
	}

	/**
	 * Check environment type
	 *
	 * @return boolean
	 */
	public isStaging(): boolean {
		return singleton.env === 'staging';
	}

	/**
	 * Where we should get defaults from
	 *
	 * @return any
	 */
	private getVariable(key: string, defaults: any) {
		const output = typeof window === 'object' && (window as any)['env'] ? (window as any)['env'][key] : defaults;

		return output;
	}
}

// Singleton
const singleton = new Environment();
export default singleton;
