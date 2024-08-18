import { Event } from '../index.js';
import { Shortcut } from './Keyboard/Shortcut.js';

/**
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Input
 * @project ChalkySticks SDK Core
 */
export class Keyboard extends Event.Dispatcher {
	/**
	 * @type Keyboard
	 */
	public static instance: Keyboard = new Keyboard();

	/**
	 * @type Shortcut
	 */
	protected shortcut: Shortcut = new Shortcut({
		ignoreInputs: true,
	});
}

// Singleton
export default new Keyboard();
