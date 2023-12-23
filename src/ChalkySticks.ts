import Constants from './Common/Constants';

/**
 * @class ChalkySticks
 * @project Style Engine Library
 */
export default class ChalkySticks {
	/**
	 * Configure library options
	 *
	 * @param any options
	 * @return void
	 */
	public static configure(options: any = {}): void {
		let key: string;

		// Assign options
		Object.assign(Constants, options.constants);
	}
}
