// presentation.d.ts
declare class PresentationRequest {
	constructor(urls: string[]);
	start(): Promise<PresentationConnection>;
	reconnect(id: string): Promise<PresentationConnection>;
	getAvailability(url: string): Promise<PresentationAvailability>;
}

interface PresentationConnection {
	onmessage: ((event: MessageEvent) => void) | null;
	onterminate: (() => void) | null;
	close(): void;
	terminate(): void;
	postMessage(message: any): void;
}

interface PresentationAvailability {
	value: boolean;
	onchange: (() => void) | null;
}

interface Navigator {
	presentation: {
		defaultRequest?: PresentationRequest;
		receiver?: any;
	};
}

/**
 * Toggles fullscreen mode for a given HTML element or exits fullscreen mode if already active.
 *
 * @param HTMLElement element
 * @return void
 */
export function toggleFullscreen(element: HTMLElement = document.body): void {
	if (!document.fullscreenElement) {
		element.requestFullscreen().catch((err: Error) => {
			console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
		});
	} else {
		document.exitFullscreen().catch((err: Error) => {
			console.error(`Error attempting to exit fullscreen mode: ${err.message}`);
		});
	}
}

/**
 * Checks if fullscreen mode is currently active.
 *
 * @return boolean
 */
export function isFullscreenActive(): boolean {
	return !!document.fullscreenElement;
}

/**
 * Attempts to cast a media element to a device using the Presentation API.
 *
 * @param HTMLMediaElement mediaElement
 * @return Promise<void>
 */
export async function castToDevice(url: string): Promise<void> {
	if (!('presentation' in navigator)) {
		console.error('Presentation API is not supported in this browser.');
		return;
	}

	try {
		const presentationRequest = new PresentationRequest([url]);

		presentationRequest.start().then(
			(connection: any) => {
				console.log('Connected to presentation:', connection);

				connection.onterminate = () => {
					console.log('Presentation terminated.');
				};
			},
			(err: any) => {
				console.error('Error starting presentation:', err);
			},
		);
	} catch (err) {
		console.error('Error casting to device:', err);
	}
}
