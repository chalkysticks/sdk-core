export declare function documentHeight(): number;
export declare function getDate(dateString?: string): Date;
export declare function offsetLeft(element: HTMLElement): number;
export declare function offsetHeight(element: HTMLElement): number;
export declare function offsetTop(element: HTMLElement): number;
export declare function offsetWidth(element: HTMLElement): number;
export declare const requestAnimationFrame: ((callback: FrameRequestCallback) => number) & typeof globalThis.requestAnimationFrame;
export declare function sleep(ms: number): Promise<void>;
