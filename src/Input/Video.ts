import { Event } from '../index.js';

/**
 * @type interface
 */
export interface IVideoSource {
	deviceId: string;
	label: string;
}

/**
 * @author Matt Kenefick <matt@chalkysticks.com>
 * @package Input
 * @project ChalkySticks SDK Core
 */
export class Video extends Event.Dispatcher {
	/**
	 * Get a list of video input devices.
	 *
	 * @returns Promise<IVideoSource[]>
	 */
	public static async getSources(): Promise<IVideoSource[]> {
		// Get list of devices
		const devices = await navigator.mediaDevices.enumerateDevices();

		// Search for videos
		const videoInputs = devices.filter((device) => device.kind === 'videoinput');

		// Return objects
		return videoInputs.map((device) => ({
			deviceId: device.deviceId,
			label: device.label,
		}));
	}
}
