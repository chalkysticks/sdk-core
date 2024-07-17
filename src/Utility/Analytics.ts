// @ts-nocheck

/**
 * @type interface
 */
interface IRedditPixelOptions {
	aaid?: string;
	email?: string;
	externalId?: string;
	idfa?: string;
	optOut?: boolean;
	useDecimalCurrencyValues?: boolean;
}

/**
 * Embeds Google Analytics script into the page.
 *
 * @param id Google Analytics ID.
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 * @return void
 */
export function embedGoogleAnalytics(id: string): void {
	if (window.gtag) {
		console.warn('Analytics is already embedded');
		return;
	}

	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
	document.head.appendChild(script);

	window.dataLayer = window.dataLayer || [];

	// Log
	console.log('GA:', id);

	/**
	 * @return void
	 */
	window.gtag = function gtag(): void {
		window.dataLayer.push(arguments);
	};

	gtag('js', new Date());
	gtag('config', id);
}

/**
 * Example:
 *
 * 	embedRedditPixel('t2_8jfy6s9bf', {
 * 	    optOut: false,
 * 	    useDecimalCurrencyValues: true,
 * 	    aaid: '<AAID-HERE>',
 * 	    email: '<EMAIL-HERE>',
 * 	    externalId: '<EXTERNAL-ID-HERE>',
 * 	    idfa: '<IDFA-HERE>'
 * 	});
 *
 * @param string pixelId
 * @param IRedditPixelOptions options
 * @return void
 */
export function embedRedditPixel(pixelId: string, options: IRedditPixelOptions = {}): void {
	if (window.rdt) {
		console.warn('Reddit pixel is already embedded');
		return;
	}

	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://www.redditstatic.com/ads/pixel.js';

	const firstScript = document.getElementsByTagName('script')[0];
	firstScript.parentNode.insertBefore(script, firstScript);

	window.rdt = function rdt(): void {
		window.rdt.sendEvent ? window.rdt.sendEvent(...arguments) : window.rdt.callQueue.push(arguments);
	};
	window.rdt.callQueue = [];

	// Log
	console.log('RP:', pixelId);

	rdt('init', pixelId, options);
	rdt('track', 'PageVisit');
}

/**
 * Example:
 *
 * 	embedMetaPixel('1181907652602034');
 *
 * @param string pixelId
 * @return void
 */
export function embedMetaPixel(pixelId: string): void {
	if (window.fbq) {
		console.warn('Facebook pixel is already embedded');
		return;
	}

	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://connect.facebook.net/en_US/fbevents.js';

	const firstScript = document.getElementsByTagName('script')[0];
	firstScript.parentNode.insertBefore(script, firstScript);

	window.fbq = function fbq(): void {
		window.fbq.callMethod ? window.fbq.callMethod(...arguments) : window.fbq.queue.push(arguments);
	};

	if (!window._fbq) {
		window._fbq = window.fbq;
	}

	window.fbq.push = window.fbq;
	window.fbq.queue = [];
	window.fbq.loaded = true;
	window.fbq.version = '2.0';

	// Log
	console.log('MP:', pixelId);

	fbq('init', pixelId);
	fbq('track', 'PageView');
}
