/**
 * @return string
 */
export function userAgent(): string {
	return navigator.userAgent;
}

/**
 * @return boolean
 */
export function isMobile(): boolean {
	return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent());
}

/**
 * @return boolean
 */
export function isIOS(): boolean {
	return /iphone|ipad|ipod/i.test(userAgent());
}

/**
 * @return boolean
 */
export function isAndroid(): boolean {
	return /android/i.test(userAgent());
}

/**
 * @return boolean
 */
export function isLandscape(): boolean {
	return window.orientation === 90 || window.orientation === -90;
}

/**
 * @return boolean
 */
export function isPortrait(): boolean {
	return !isLandscape();
}

/**
 * @return boolean
 */
export function getOrientation(): 'portrait' | 'landscape' {
	return isLandscape() ? 'landscape' : 'portrait';
}

/**
 * @return boolean
 */
export function isTouchDevice(): boolean {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * @return boolean
 */
export function getScreenWidth(): number {
	return window.screen.width;
}

/**
 * @return boolean
 */
export function getScreenHeight(): number {
	return window.screen.height;
}

/**
 * @return boolean
 */
export function getBrowserName(): string {
	const ua = userAgent();

	if (ua.indexOf('firefox') > -1) {
		return 'Firefox';
	} else if (ua.indexOf('opera') > -1 || ua.indexOf('opr') > -1) {
		return 'Opera';
	} else if (ua.indexOf('chrome') > -1) {
		return 'Chrome';
	} else if (ua.indexOf('safari') > -1) {
		return 'Safari';
	} else if (ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1) {
		return 'Internet Explorer';
	} else {
		return 'Unknown';
	}
}

/**
 * @return boolean
 */
export function getBrowserVersion(): string {
	const ua = userAgent();
	let tem: RegExpMatchArray | null = ua.match(/version\/(\d+)/i);

	if (tem === null) {
		tem = ua.match(/(?:msie |rv:)(\d+)/);
	}

	if (tem === null) {
		tem = ua.match(/(?:chrome|safari|firefox|opera|opr|edge)\/(\d+)/i);
	}

	if (tem === null) {
		return 'Unknown';
	}

	return tem[1];
}

/**
 * @return boolean
 */
export function isIE(): boolean {
	return getBrowserName() === 'Internet Explorer';
}

/**
 * @return boolean
 */
export function isEdge(): boolean {
	return getBrowserName() === 'Edge';
}

/**
 * @return boolean
 */
export function isChrome(): boolean {
	return getBrowserName() === 'Chrome';
}

/**
 * @return boolean
 */
export function isFirefox(): boolean {
	return getBrowserName() === 'Firefox';
}

/**
 * @return boolean
 */
export function isSafari(): boolean {
	return getBrowserName() === 'Safari';
}

/**
 * @return boolean
 */
export function isOpera(): boolean {
	return getBrowserName() === 'Opera';
}
