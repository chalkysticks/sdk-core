import Constants from '../Common/Constants';

/**
 * @return number
 */
export function documentHeight(): number {
	return Math.max(
		document.body.scrollHeight,
		document.body.offsetHeight,
		document.documentElement.clientHeight,
		document.documentElement.scrollHeight,
		document.documentElement.offsetHeight,
	);
}

/**
 * @param string variableName
 * @param HTMLElement element
 * @return string
 */
export function getCSSVariable(variableName: string, element: HTMLElement = document.documentElement): string {
	const value = getComputedStyle(element).getPropertyValue(variableName).trim();
	return value;
}

/**
 * @return Promise<void>
 */
export function getDate(dateString: string = ''): Date {
	dateString || (dateString = Constants.CURRENT_DATE);

	return dateString ? new Date(dateString) : new Date();
}

/**
 * @param HTMLElement element
 * @return number
 */
export function offsetLeft(element: HTMLElement): number {
	let offset = 0;

	do {
		offset += element.offsetLeft;
		element = element.offsetParent as HTMLElement;
	} while (element);

	return offset;
}

/**
 * @param HTMLElement element
 * @return number
 */
export function offsetHeight(element: HTMLElement): number {
	return element.offsetHeight;
}

/**
 * @param HTMLElement element
 * @return number
 */
export function offsetTop(element: HTMLElement): number {
	let offset = 0;

	do {
		offset += element.offsetTop;
		element = element.offsetParent as HTMLElement;
	} while (element);

	return offset;
}

/**
 * @param HTMLElement element
 * @return number
 */
export function offsetWidth(element: HTMLElement): number {
	return element.offsetWidth;
}

/**
 * Polyfill for requestAnimationFrame
 */
export const requestAnimationFrame =
	typeof window !== 'undefined' && window.requestAnimationFrame
		? window.requestAnimationFrame.bind(window)
		: (callback: any) => setTimeout(() => callback(Date.now()), 16);

/**
 * @param number ms
 * @return Promise<void>
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
