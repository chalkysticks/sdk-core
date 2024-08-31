import { Event, Utility } from '../index.js';

/**
 * @interface IPointerEvent
 */
export interface IPointerEvent {
	x: number;
	y: number;
}

/**
 * This is specifically because of IESafari
 * @see https://stackoverflow.com/questions/58473921/why-cant-i-use-touchevent-in-safari
 */
export type AppTouchEvent = TouchEvent;

/**
 * Pointer is a singleton class that handles all pointer/touch events
 * and dispatches them to the appropriate targets.
 *
 * Example Usage:
 *
 * 	import Pointer from '@/Input/Pointer';
 *
 * 	const pointer = new Pointer();

 * 	pointer.on('down', ({ data }) => {
 * 		console.log('Down!', data);
 * 	});
 *
 * 	pointer.on('drag', ({ data }) => {
 * 		console.log('Drag', data);
 * 	});
 *
 * 	pointer.on('move', ({ data }) => {
 * 		console.log('Move!', data);
 * 	});
 *
 * 	pointer.on('up', ({ data }) => {
 * 		console.log('Up!', data);
 * 	});
 *
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Input
 * @project ChalkySticks SDK Core
 */
export class Pointer extends Event.Dispatcher {
	// region: Static
	// ---------------------------------------------------------------------------

	/**
	 * @type Pointer
	 */
	public static instance: Pointer;

	/**
	 * @param string eventType
	 * @param boolean autoTouchEvents
	 * @return void
	 */
	public static start(eventType: string = 'pointer', autoTouchEvents: boolean = false): void {
		if (!this.instance) {
			this.instance = new Pointer(eventType, autoTouchEvents);
		}
	}

	// endregion: Static

	// region: Instance
	// ---------------------------------------------------------------------------

	/**
	 * Our active target
	 *
	 * @type HTMLElement
	 */
	public activeTarget: HTMLElement;

	/**
	 * Our active target
	 *
	 * @type HTMLElement
	 */
	public currentTarget: HTMLElement;

	/**
	 * Angle from origin
	 *
	 * @type number
	 */
	public angle: number = 0;

	/**
	 * If values have changed (usually velocity)
	 *
	 * @type boolean
	 */
	public changed: boolean = false;

	/**
	 * Distance from origin
	 *
	 * @type number
	 */
	public distance: number = 0;

	/**
	 * If we're pressing
	 *
	 * @type boolean
	 */
	public down: boolean = false;

	/**
	 * Difference X
	 *
	 * @type number
	 */
	public dx: number = 0;

	/**
	 * Difference Y
	 *
	 * @type number
	 */
	public dy: number = 0;

	/**
	 * The higher the number, the slower it stops
	 *
	 * @type number
	 */
	public friction: number = 0.95;

	/**
	 * Inertia
	 *
	 * @type number
	 */
	public inertia: number = 0;

	/**
	 * Last X
	 *
	 * @type number
	 */
	public lastX: number = 0;

	/**
	 * Last Y
	 *
	 * @type number
	 */
	public lastY: number = 0;

	/**
	 * If mouse moved since being down
	 *
	 * @type boolean
	 */
	public moved: boolean = false;

	/**
	 * Relative X
	 *
	 * @type number
	 */
	public rx: number = 0;

	/**
	 * Relative X with velocity
	 *
	 * @type number
	 */
	public rx2: number = 0;

	/**
	 * Relative Y
	 *
	 * @type number
	 */
	public ry: number = 0;

	/**
	 * Relative Y with velocity
	 *
	 * @type number
	 */
	public ry2: number = 0;

	/**
	 * Relative Origin Y
	 *
	 * @type number
	 */
	public rox: number = 0;
	public roy: number = 0;
	public rox2: number = 0;
	public roy2: number = 0;

	/**
	 * Origin X
	 *
	 * @type number
	 */
	public ox: number = 0;

	/**
	 * Origin Y
	 *
	 * @type number
	 */
	public oy: number = 0;

	/**
	 * Our hover target
	 *
	 * @type HTMLElement
	 */
	public target!: HTMLElement | Document;

	/**
	 * Time
	 * @type number
	 */
	public time: number = Date.now();

	/**
	 * Time pointer was down
	 * @type number
	 */
	public timeDown: number = 0;

	/**
	 * Difference from time down
	 * @type number
	 */
	public timeDownDifference: number = 0;

	/**
	 * Time difference
	 * @type number
	 */
	public timeDifference: number = 0;

	/**
	 * Velocity X
	 *
	 * @type number
	 */
	public vx: number = 0;

	/**
	 * Velocity Y
	 *
	 * @type number
	 */
	public vy: number = 0;

	/**
	 * Current X
	 *
	 * @type number
	 */
	public x: number = 0;

	/**
	 * X with inertia applied
	 *
	 * @type number
	 */
	public x2: number = 0;

	/**
	 * Current Y
	 *
	 * @type number
	 */
	public y: number = 0;

	/**
	 * Y with inertia applied
	 *
	 * @type number
	 */
	public y2: number = 0;

	/**
	 * If wheel is scrolling
	 *
	 * @type boolean
	 */
	public wheel: boolean = false;

	/**
	 * Wheel delta
	 *
	 * @type number
	 */
	public wheelDelta: number = 0;

	/**
	 * @type boolean
	 */
	protected autoTouchEvents: boolean;

	/**
	 * Pixels to move before considering it an actual move
	 *
	 * @type number
	 */
	protected moveThreshold: number = 5;

	/**
	 * @type string
	 */
	private cid: string = Math.random().toString(36).substr(2, 9);

	/**
	 * @type string
	 */
	private eventType: string = '';

	/**
	 * @type number
	 */
	private holdTimeout: number | null = null;

	/**
	 * @type number
	 */
	private lastTapTime: number = 0;

	/**
	 * @type number
	 */
	private tapCount: number = 0;

	/**
	 * @type number
	 */
	private tapTimeout: number | null = null;

	/**
	 * @type number
	 */
	private twoFingerTapCount: number = 0;

	/**
	 * @type number[]
	 */
	private vxHistory: number[] = [];

	/**
	 * @type number[]
	 */
	private vyHistory: number[] = [];

	/**
	 * @param string eventType
	 * @param boolean autoTouchEvents
	 * @param HTMLElement target
	 * @constructor
	 */
	constructor(eventType: string = 'pointer', autoTouchEvents: boolean = false, target: HTMLElement | Document = document) {
		super();

		// Bindings
		this.Handle_OnInterval = this.Handle_OnInterval.bind(this);
		this.Handle_OnPointerDown = this.Handle_OnPointerDown.bind(this);
		this.Handle_OnPointerMove = this.Handle_OnPointerMove.bind(this);
		this.Handle_OnPointerUp = this.Handle_OnPointerUp.bind(this);
		this.Handle_OnWheel = this.Handle_OnWheel.bind(this);

		// Set event type
		this.autoTouchEvents = autoTouchEvents;
		this.eventType = eventType;

		// Set the target
		this.target = target;

		// Attach
		this.attachEvents();
	}

	/**
	 * @return void
	 */
	public attachEvents(): void {
		// Event handlers
		if (typeof window !== 'undefined' && 'ontouchstart' in window && this.autoTouchEvents) {
			// @ts-ignore
			this.target.addEventListener('touchstart', this.Handle_OnPointerDown);
			// @ts-ignore
			this.target.addEventListener('touchmove', this.Handle_OnPointerMove);
			// @ts-ignore
			this.target.addEventListener('touchend', this.Handle_OnPointerUp);
		} else {
			// @ts-ignore
			this.target.addEventListener(this.downEvent, this.Handle_OnPointerDown);
			// @ts-ignore
			this.target.addEventListener(this.moveEvent, this.Handle_OnPointerMove);
			// @ts-ignore
			this.target.addEventListener(this.upEvent, this.Handle_OnPointerUp);
		}

		// Wheel
		// @ts-ignore
		this.target.addEventListener('wheel', this.Handle_OnWheel, {
			passive: false,
		});

		// Log attachments
		// console.log(`Pointer: Attached to ${this.downEvent}, ${this.moveEvent}, ${this.upEvent}`);

		// Use interval to update velocity
		Utility.Interval.add(this.Handle_OnInterval, 1000 / 60, `${this.cid}-pointer-velocity`);
	}

	/**
	 * @return void
	 */
	public detachEvents(): void {
		// Event handlers
		if (typeof window !== 'undefined' && 'ontouchstart' in window && this.autoTouchEvents) {
			// @ts-ignore
			this.target.removeEventListener('touchstart', this.Handle_OnPointerDown);
			// @ts-ignore
			this.target.removeEventListener('touchmove', this.Handle_OnPointerMove);
			// @ts-ignore
			this.target.removeEventListener('touchend', this.Handle_OnPointerUp);
		} else {
			// @ts-ignore
			this.target.removeEventListener(this.downEvent, this.Handle_OnPointerDown);
			// @ts-ignore
			this.target.removeEventListener(this.moveEvent, this.Handle_OnPointerMove);
			// @ts-ignore
			this.target.removeEventListener(this.upEvent, this.Handle_OnPointerUp);
		}

		// Wheel
		// @ts-ignore
		this.target.removeEventListener('wheel', this.Handle_OnWheel);

		// Use interval to update velocity
		Utility.Interval.remove(`${this.cid}-pointer-velocity`);
	}

	/**
	 * @return void
	 */
	public applyForMobile(): void {
		// Disable overscroll on html,body
		document.body.style.overscrollBehavior = 'none';

		// Disable touch move on document
		document.addEventListener(
			'touchmove',
			function (e) {
				e.preventDefault();
			},
			{ passive: false },
		);
	}

	/**
	 * @param boolean capture
	 * @return void
	 */
	public capturePinchZoom(capture: boolean): void {
		document.addEventListener(
			'wheel',
			(e: WheelEvent) => {
				if (capture) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
				}

				this.Handle_OnWheel(e);
			},
			{
				capture: capture,
				passive: false,
			},
		);

		document.body.style.touchAction = 'pan-x pan-y';
		document.body.style.userSelect = 'none';
	}

	/**
	 * @param number x
	 * @param number y
	 * @return Pointer
	 */
	public resetRelative(x: number = 0, y: number = 0): Pointer {
		this.rox = this.rox2 = this.rx = this.rx2 = x;
		this.roy = this.roy2 = this.ry = this.ry2 = y;
		return this;
	}

	/**
	 * @return string
	 */
	private get downEvent(): string {
		let output: string = '';

		switch (this.eventType) {
			case 'pointer':
				output = 'pointerdown';
				break;

			case 'touch':
				output = 'touchstart';
				break;

			default:
				output = 'mousedown';
				break;
		}

		return output as string;
	}

	/**
	 * @return string
	 */
	private get moveEvent(): string {
		let output: string = '';

		switch (this.eventType) {
			case 'pointer':
				output = 'pointermove';
				break;

			case 'touch':
				output = 'touchmove';
				break;

			default:
				output = 'mousemove';
				break;
		}

		return output as string;
	}

	/**
	 * @return string
	 */
	private get upEvent(): string {
		let output: string = '';

		switch (this.eventType) {
			case 'pointer':
				output = 'pointerup';
				break;

			case 'touch':
				output = 'touchend';
				break;

			default:
				output = 'mouseup';
				break;
		}

		return output as string;
	}

	/**
	 * @param TouchEvent e
	 * @return number
	 */
	private getDistanceBetweenTouches(e: TouchEvent): number {
		if (e.touches.length < 2) return 0;

		const touch1 = e.touches[0];
		const touch2 = e.touches[1];
		const dx = touch1.pageX - touch2.pageX;
		const dy = touch1.pageY - touch2.pageY;

		return Math.sqrt(dx * dx + dy * dy);
	}

	// endregion: Instance

	// region: Event Handlers
	// ---------------------------------------------------------------------------

	/**
	 * @return Promise<void>
	 */
	protected async Handle_OnInterval(): Promise<void> {
		const ovx = this.vx;
		const ovy = this.vy;

		// Slow down the velocity
		this.vx *= this.friction;
		this.vy *= this.friction;

		// Stop velocity
		if (Math.abs(this.vx) < 0.025) {
			this.vx = 0;
		}

		if (Math.abs(this.vy) < 0.025) {
			this.vy = 0;
		}

		// Ensure velocity is a real number and not any version of Infinity or NaN
		if (!isFinite(this.vx)) {
			this.vx = 0;
		}

		if (!isFinite(this.vy)) {
			this.vy = 0;
		}

		// Apply velocity
		if (!this.down) {
			this.x2 += this.vx * 5;
			this.y2 += this.vy * 5;
			this.rx2 += this.vx * 5;
			this.ry2 += this.vy * 5;
		}

		// Check if changed
		this.changed = this.vx !== ovx || this.vy !== ovy;
	}

	/**
	 * @param PointerEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnPointerDown(e: MouseEvent | PointerEvent | AppTouchEvent): Promise<void> {
		const isTwoFingerTap = 'touches' in e && e.touches.length === 2;
		const position = {
			x: this.x,
			y: this.y,
		};

		this.down = true;
		this.moved = false;
		this.timeDown = Date.now();

		// We're using 'touches' in e rather than e instanceof TouchEvent
		// because of how bad Safari is. The worst browser ever made.
		this.ox = this.x = 'touches' in e ? e.touches[0].clientX : e.clientX;
		this.oy = this.y = 'touches' in e ? e.touches[0].clientY : e.clientY;

		// Reduce offset of target if not the Document
		if (this.target !== document) {
			const rect = (this.target as HTMLElement).getBoundingClientRect();
			this.ox -= rect.left;
			this.oy -= rect.top;
		}

		// Reset relative
		this.rox = this.rx;
		this.roy = this.ry;
		this.rox2 = this.rx2;
		this.roy2 = this.ry2;

		// Event
		this.dispatch('down', {
			x: this.x,
			y: this.y,
		});

		// ---------------------------------------------------------------------

		if (isTwoFingerTap) {
			this.twoFingerTapCount++;

			if (this.twoFingerTapCount === 1) {
				setTimeout(() => {
					if (this.twoFingerTapCount === 1 && !this.down) {
						this.dispatch('twofingertap', position);
					} else if (this.twoFingerTapCount === 2) {
						this.dispatch('twofingerdoubletap', position);
					}

					this.twoFingerTapCount = 0;
				}, 300);
			}
		} else {
			this.tapCount++;

			if (this.timeDown - this.lastTapTime < 300) {
				clearTimeout(this.tapTimeout!);
				this.dispatch('doubletap', position);
				this.tapCount = 0;
			} else {
				this.tapTimeout = setTimeout(() => {
					if (this.tapCount === 1 && !this.down) {
						this.dispatch('tap', position);
					}

					this.tapCount = 0;
				}, 300) as any;
			}

			this.lastTapTime = this.timeDown;

			this.holdTimeout = setTimeout(() => {
				if (this.down) {
					this.dispatch('hold', position);
				}
			}, 500) as any;
		}
	}

	/**
	 * @param PointerEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnPointerMove(e: MouseEvent | PointerEvent | TouchEvent): Promise<void> {
		// Clear tap testing
		if (this.moved && this.holdTimeout) {
			clearTimeout(this.holdTimeout);
		}

		// Save last position
		this.lastX = this.x;
		this.lastY = this.y;

		// Get new position
		// We're using 'touches' in e rather than e instanceof TouchEvent
		// because of how bad Safari is. The worst browser ever made.
		this.x = 'touches' in e ? e.touches[0].clientX : e.clientX;
		this.y = 'touches' in e ? e.touches[0].clientY : e.clientY;

		// Reduce offset of target if not the Document
		if (this.target !== document) {
			const rect = (this.target as HTMLElement).getBoundingClientRect();
			this.x -= rect.left;
			this.y -= rect.top;
		}

		// Save target
		this.currentTarget = e.currentTarget as HTMLElement;
		this.activeTarget = e.target as HTMLElement;

		// Set time
		this.timeDifference = Date.now() - this.time;
		this.time = Date.now();

		// Event
		this.dispatch('move', {
			x: this.x,
			y: this.y,
		});

		// Maintain a history of velocities
		this.vxHistory.push((this.x - this.lastX) / this.timeDifference);
		this.vyHistory.push((this.y - this.lastY) / this.timeDifference);

		// Only keep the last N velocities
		if (this.vxHistory.length > 5) this.vxHistory.shift();
		if (this.vyHistory.length > 5) this.vyHistory.shift();

		// Dragging
		if (this.down) {
			this.dx = this.x - this.ox;
			this.dy = this.y - this.oy;
			this.rx = this.rox + this.dx;
			this.ry = this.roy + this.dy;
			this.rx2 = this.rox2 + this.dx;
			this.ry2 = this.roy2 + this.dy;
			this.angle = Math.atan2(this.dy, this.dx) * (180 / Math.PI);
			this.distance = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
			this.moved = Math.abs(this.distance) > this.moveThreshold;
			this.x2 = this.x;
			this.y2 = this.y;
			this.timeDownDifference = this.time - this.timeDown;

			// Calculate the inertia
			this.inertia = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));

			// Calculate the moving average (default to 1 to avoid infinity)
			this.vx = this.vxHistory.reduce((a, b) => a + b) / (this.vxHistory.length || 1);
			this.vy = this.vyHistory.reduce((a, b) => a + b) / (this.vyHistory.length || 1);

			// Event
			this.dispatch('drag', {
				angle: this.angle,
				changed: this.changed,
				distance: this.distance,
				dx: this.dx,
				dy: this.dy,
				inertia: this.inertia,
				moved: this.moved,
				ox: this.ox,
				oy: this.oy,
				rx: this.rx,
				ry: this.ry,
				rx2: this.rx2,
				ry2: this.ry2,
				time: this.time,
				timeDown: this.timeDown,
				timeDownDifference: this.timeDownDifference,
				timeDifference: this.timeDifference,
				vx: this.vx,
				vy: this.vy,
				x: this.x,
				y: this.y,
			});
		}
	}

	/**
	 * @param PointerEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnPointerUp(e: MouseEvent | PointerEvent | TouchEvent): Promise<void> {
		this.down = false;

		// Event
		this.dispatch('up', {
			x: this.x,
			y: this.y,
		});

		// Clear tap testing
		if (this.moved && this.holdTimeout) {
			clearTimeout(this.holdTimeout);
		}
	}

	/**
	 * @param WheelEvent e
	 * @return Promise<void>
	 */
	protected async Handle_OnWheel(e: WheelEvent): Promise<void> {
		// @ts-ignore
		const isTrackpad = ~~(Math.abs(e.wheelDeltaY || 1) / Math.abs(e.deltaY || 1)) > 1;
		const deltaY = e.deltaY;
		const direction = deltaY > 0 ? 'out' : 'in';

		Utility.Debounce.exec(
			this.cid,
			() => {
				this.wheel = false;
				this.wheelDelta = 0;
			},
			100,
			true,
		);

		if (deltaY) {
			this.wheel = true;
		}

		this.wheelDelta = deltaY;

		this.dispatch('zoom', {
			delta: deltaY * -1,
			direction: direction,
			isTrackpad: isTrackpad,
		});

		this.dispatch('zoom:' + direction, {
			delta: deltaY * -1,
			isTrackpad: isTrackpad,
		});
	}

	// endregion: Event Handlers
}
