import { Event } from '../index.js';
export interface IPointerEvent {
    x: number;
    y: number;
}
export type AppTouchEvent = TouchEvent;
export interface IPointerZoomEvent {
    delta: number;
    direction: string;
    isTrackpad: boolean;
    type: 'pinch' | 'wheel';
}
export interface IPointerDragEvent {
    angle: number;
    changed: boolean;
    distance: number;
    dx: number;
    dy: number;
    inertia: number;
    moved: boolean;
    ox: number;
    oy: number;
    rx: number;
    ry: number;
    rx2: number;
    ry2: number;
    time: number;
    timeDown: number;
    timeDownDifference: number;
    timeDifference: number;
    vx: number;
    vy: number;
    x: number;
    y: number;
}
export interface IPointerSwipeOptions {
    distanceThreshold?: number;
    timeThreshold?: number;
    velocityThreshold?: number;
}
export interface ISwipeEvent {
    direction: 'left' | 'right' | 'up' | 'down';
    distance: number;
    duration: number;
    velocity: number;
}
export declare class Pointer extends Event.Dispatcher {
    static instance: Pointer;
    static start(eventType?: string, autoTouchEvents?: boolean): void;
    activeTarget: HTMLElement;
    currentTarget: HTMLElement;
    angle: number;
    changed: boolean;
    distance: number;
    down: boolean;
    dx: number;
    dy: number;
    friction: number;
    inertia: number;
    lastX: number;
    lastY: number;
    moved: boolean;
    rx: number;
    rx2: number;
    ry: number;
    ry2: number;
    rox: number;
    roy: number;
    rox2: number;
    roy2: number;
    ox: number;
    oy: number;
    target: HTMLElement | Document;
    time: number;
    timeDown: number;
    timeDownDifference: number;
    timeDifference: number;
    touches: number;
    vx: number;
    vy: number;
    x: number;
    x2: number;
    y: number;
    y2: number;
    wheel: boolean;
    wheelDelta: number;
    protected autoTouchEvents: boolean;
    protected moveThreshold: number;
    protected swipeThreshold: number;
    protected swipeTimeThreshold: number;
    protected swipeVelocityThreshold: number;
    private cid;
    private eventType;
    private holdTimeout;
    private initialPinchDistance;
    private lastPinchDistance;
    private lastTapTime;
    private tapCount;
    private tapTimeout;
    private twoFingerTapCount;
    private vxHistory;
    private vyHistory;
    constructor(eventType?: string, autoTouchEvents?: boolean, target?: HTMLElement | Document);
    attachEvents(): void;
    detachEvents(): void;
    applyForMobile(disableTouchMove?: boolean, disableTouchEnd?: boolean, disableContextMenu?: boolean): void;
    capturePinchZoom(capture: boolean): void;
    configureSwipe(options: IPointerSwipeOptions): Pointer;
    resetRelative(x?: number, y?: number): Pointer;
    private get downEvent();
    private get moveEvent();
    private get upEvent();
    private getDistanceBetweenTouches;
    protected Handle_OnInterval(): Promise<void>;
    protected Handle_OnPointerDown(e: MouseEvent | PointerEvent | AppTouchEvent): Promise<void>;
    protected Handle_OnPointerMove(e: MouseEvent | PointerEvent | TouchEvent): Promise<void>;
    protected Handle_OnPointerUp(e: MouseEvent | PointerEvent | TouchEvent): Promise<void>;
    protected Handle_OnWheel(e: WheelEvent): Promise<void>;
}
