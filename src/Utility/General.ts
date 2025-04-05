import * as Event from '../Event/index.js';
import Constants from '../Common/Constants.js';

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
 * Retrieves the value of a query parameter from the current URL, if in a browser context.
 *
 * @param string key The name of the query parameter to retrieve.
 * @return string|null
 */
export function getQueryParameter(key: string): string | null {
	if (typeof window === 'undefined' || typeof window.location === 'undefined') {
		return null;
	}

	const urlSearchParams: URLSearchParams = new URLSearchParams(window.location.search);
	return urlSearchParams.get(key);
}

/**
 * Retrieves query parameters from the current window's URL.
 *
 * @return Record<string, string | null>
 */
export function getQueryParameters(): Record<string, string | null> {
	if (typeof window?.location?.search !== 'string') {
		return {};
	}

	const parameters: Record<string, string | null> = {};

	new URLSearchParams(window.location.search).forEach((value, key) => {
		parameters[key] = value || null;
	});

	return parameters;
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
 * @param string key
 * @param string value
 * @return void
 */
export function setQueryParameter(key: string, value: string | null): void {
	if (typeof window === 'undefined' || typeof window.history === 'undefined') {
		return;
	}

	const url: URL = new URL(window.location.href);
	const searchParams: URLSearchParams = url.searchParams;
	const eventPayload: Record<string, string | null> = {
		key,
		value,
	};

	if (value === null) {
		searchParams.delete(key);
		Event.Bus.dispatch('queryParameter:unset', eventPayload);
	} else {
		searchParams.set(key, value);
		Event.Bus.dispatch('queryParameter:set', eventPayload);
	}

	const newUrl: string = `${url.pathname}?${searchParams.toString()}${url.hash}`;
	window.history.replaceState({}, '', newUrl);

	// Trigger global event
	Event.Bus.dispatch('queryParameter', eventPayload);
}

/**
 * @param params Record<string, string | null>
 * @return void
 */
export function setQueryParameters(params: Record<string, string | null>): void {
	if (typeof window === 'undefined' || typeof window.history === 'undefined') {
		return;
	}

	const url: URL = new URL(window.location.href);
	const searchParams: URLSearchParams = url.searchParams;

	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			const value = params[key];
			if (value === null) {
				searchParams.delete(key);
				Event.Bus.dispatch('queryParameters:unset', params);
			} else {
				searchParams.set(key, value);
				Event.Bus.dispatch('queryParameters:set', params);
			}
		}
	}

	const newUrl: string = `${url.pathname}?${searchParams.toString()}${url.hash}`;
	window.history.replaceState({}, '', newUrl);

	Event.Bus.dispatch('queryParameters', params);
}

/**
 * @param number ms
 * @return Promise<void>
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
