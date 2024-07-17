/**
 * Polyfill for requestAnimationFrame
 */
export const requestAnimationFrame =
	typeof window !== 'undefined' && window.requestAnimationFrame
		? window.requestAnimationFrame.bind(window)
		: (callback: any) => setTimeout(() => callback(Date.now()), 16);
