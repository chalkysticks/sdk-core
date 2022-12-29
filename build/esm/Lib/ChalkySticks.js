import Constants from '../Common/Constants';
/**
 * @class ChalkySticks
 * @package Lib
 * @project Style Engine Library
 */
export default class ChalkySticks {
    /**
     * Configure library options
     *
     * @param any options
     * @return void
     */
    static configure(options = {}) {
        let key;
        // Assign options
        Object.assign(Constants, options.constants);
    }
}
