import { Event } from '../../index.js';

/**
 * @type Func
 */
type TShortcutCallback = () => void;

/**
 * @type interface
 */
export interface IShortcutOptions {
	ignoreInputs?: boolean;
}

/**
 * Shortcut is a class that allows you to register keyboard shortcuts
 * and fire callbacks when they're pressed.
 *
 * Example Usage:
 *
 * 		Shortcut.add('a', () => {
 * 			console.log('A was pressed');
 * 		});
 *
 * 		Shortcut.add('cmd+a', () => {
 * 			console.log('Command + A was pressed');
 * 		});
 *
 * Notes:
 *
 * 	There are still some issues with the keyup removal. If we press
 *  enough meta keys, we'll get stuck in a state where some are not
 *  removed.
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Input/Keyboard
 * @project ChalkySticks SDK Core
 */
export class Shortcut extends Event.Dispatcher {
	/**
	 * @param string key
	 * @param Function callback
	 * @return void
	 */
	public static add(key: string, callback: TShortcutCallback): void {
		shortcutSingleton.add(key, callback);
	}

	/**
	 * @type Record<string, TShortcutCallback>
	 */
	protected keymap: Record<string, TShortcutCallback> = {};

	/**
	 * @type boolean
	 */
	private attached: boolean = false;

	/**
	 * @type Record<string, boolean>
	 */
	private keysDown: Record<string, boolean> = {};

	/**
	 * @type IShortcutOptions
	 */
	private options: IShortcutOptions = {
		ignoreInputs: true,
	};

	/**
	 * @param IShortcutOptions options
	 * @constructor
	 */
	constructor(options: IShortcutOptions = {}) {
		super();

		// Setup options
		Object.assign(this.options, options || {});
	}

	/**
	 * @param string key
	 * @param Function callback
	 * @return void
	 */
	public add(key: string, callback: TShortcutCallback): void {
		// Ensure we're setup
		this.ensureSetup();

		// Add keymap to map
		this.keymap[key] = callback;
	}

	/**
	 * @param string key
	 * @return void
	 */
	public remove(key: string): void {
		delete this.keymap[key];
	}

	/**
	 * @return void
	 */
	protected ensureSetup(): void {
		// Prevent multiple setups
		if (this.attached) {
			return;
		}

		// Set attached
		this.attached = true;

		// Add event listener
		document.addEventListener('keydown', this.Handle_OnKeyDown.bind(this));
		document.addEventListener('keyup', this.Handle_OnKeyUp.bind(this));
	}

	/**
	 * @return string | undefined
	 */
	protected findMatch(): string | undefined {
		let keys: string[] = Object.keys(this.keymap);

		// Sort longest combinations to shortest
		keys = keys.sort((a: string, b: string) => {
			return (b.match(/\+/g)?.length || 0) - (a.match(/\+/g)?.length || 0);
		});

		// Find key combinations that match keyDown
		return keys.find((key: string) => {
			const parsed: string[] = key.replace(/\s+/g, '').toLowerCase().split('+');

			// Ensure all keys are down
			return parsed.every((key: string) => {
				return this.keysDown[key.toLowerCase()];
			});
		});
	}

	/**
	 * @param string key
	 * @return string
	 */
	protected normalize(key: string): string {
		return key
			.toLowerCase()
			.trim()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace('arrow', '');
	}

	// region: Event Handlers
	// ---------------------------------------------------------------------------

	/**
	 * @param KeyboardEvent e
	 * @return void
	 */
	protected Handle_OnKeyDown(e: KeyboardEvent): void {
		const currentTarget: HTMLElement = e.target as HTMLElement;

		// mk: This happens when a user taps the autofill selections
		if (!(e instanceof KeyboardEvent)) {
			return;
		}

		// If ignore inputs is enabled
		if (this.options.ignoreInputs) {
			// Ensure target is not an input
			if (currentTarget.tagName === 'INPUT' || currentTarget.tagName === 'TEXTAREA') {
				return;
			}
		}

		// Get key (normalize for accents)
		const key: string = this.normalize(e.key);

		// Mark key down
		this.keysDown[key] = true;

		// Special keys (alt, control, meta, shift)
		const match: string = this.findMatch() || '';

		// Get callback
		const callback: TShortcutCallback | undefined = this.keymap[match];

		// Ensure callback
		if (!callback) {
			return;
		}

		// If found, prevent default
		// I don't know if we should be making this decision
		// e.preventDefault();

		// Trigger event
		this.trigger('shortcut:found', { match });

		// Call callback
		callback();
	}

	/**
	 * @param KeyboardEvent e
	 * @return void
	 */
	protected Handle_OnKeyUp(e: KeyboardEvent): void {
		// mk: This happens when a user taps the autofill selections
		if (!(e instanceof KeyboardEvent)) {
			return;
		}

		// Get key
		const key: string = this.normalize(e.key);

		// Set key down
		delete this.keysDown[key];
	}

	// endregion: Event Handlers
}

/**
 * Shortcut Sequencer is a class that allows you to register
 * a sequence of keyboard shortcuts and fire callbacks when
 * they're pressed.
 *
 * Example Usage:
 *
 * 		ShortcutSequencer.add(['a', 'b', 'c', 'd'], () => {
 * 			console.log('A, B, C, then D was pressed');
 * 		});
 *
 * @author Matt Kenefick<matt@chalkysticks.com>
 * @project ChalkySticks SDK Core
 */
export class ShortcutSequencer extends Event.Dispatcher {
	/**
	 * @param string[] keys
	 * @param Function callback
	 * @return void
	 */
	public static add(keys: string[], callback: TShortcutCallback): void {
		shortcutSequencerSingleton.add(keys, callback);
	}

	/**
	 * @param string[] keys
	 * @return void
	 */
	public static remove(keys: string[]): void {
		shortcutSequencerSingleton.remove(keys);
	}

	/**
	 * Global instance
	 *
	 * @type ShortcutSequencer
	 */
	public static get instance(): ShortcutSequencer {
		return new ShortcutSequencer();
	}

	/**
	 * @type string[]
	 */
	protected matches: string[] = [];

	/**
	 * @type Record<string, TShortcutCallback>
	 */
	protected sequences: Record<string, TShortcutCallback> = {};

	/**
	 * @type Shortcut
	 */
	protected shortcut: Shortcut = new Shortcut();

	/**
	 * @constructor
	 */
	constructor() {
		super();

		// Event Listeners
		this.shortcut.on('shortcut:found', this.Handle_OnShortcutFound.bind(this));
	}

	/**
	 * @param string[] keys
	 * @param Function callback
	 * @return void
	 */
	public add(keys: string[], callback: TShortcutCallback): void {
		const key: string = keys.join(',');

		// Add keys to shortcut
		keys.forEach((key: string) => {
			this.shortcut.add(key, () => {});
		});

		// Add keymap to map
		this.sequences[key] = callback;
	}

	/**
	 * @param string[] keys
	 * @return void
	 */
	public remove(keys: string[]): void {
		const key: string = keys.join(',');

		// Remove keys from shortcut
		keys.forEach((key: string) => {
			this.shortcut.remove(key);
		});

		// Remove keymap from map
		delete this.sequences[key];
	}

	// region: Event Handlers
	// ---------------------------------------------------------------------------

	/**
	 * @param IDispatcherEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnShortcutFound(e: any): Promise<void> {
		const match: string = e.data.match;

		// Add match to list
		this.matches.push(match);

		// Prune list to only 20 items
		this.matches = this.matches.slice(-20);

		// Find matching sequence
		const sequence: string | undefined = Object.keys(this.sequences).find((sequence: string) => {
			const keys: string[] = sequence.split(',');
			const matches: string[] = this.matches.slice(-keys.length);

			// Ensure all keys are down
			return (
				matches.length >= keys.length &&
				matches.every((match: string, index: number) => {
					return match === keys[index];
				})
			);
		});

		// Ensure sequence
		if (!sequence) {
			return;
		}

		// Get callback
		const callback: TShortcutCallback | undefined = this.sequences[sequence];

		// Ensure callback
		if (!callback) {
			return;
		}

		// Call callback
		callback();
	}

	// endregion: Event Handlers
}

const shortcutSingleton = new Shortcut({
	ignoreInputs: true,
});

const shortcutSequencerSingleton = new ShortcutSequencer();
