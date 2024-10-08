import * as Event from '../Event/index.js';

/**
 * Share is a class that allows you to pass media to your
 * native share dialog, e.g. instagram, facebook, etc.
 *
 * Example Usage:
 *
 * 	Share.native([file], 'My Title', 'My Text', 'https://myurl.com');
 *
 * 	Share.remoteFile('https://myurl.com/image.jpg', 'My Title', 'My Text', 'https://myurl.com');
 *
 * @author Matt Kenefick<matt.kenefick@buck.co>
 * @project BUCK Utility
 */

/**
 * @param File[] selectedFiles
 * @param string title
 * @param string text
 * @param string url
 * @return Promise<boolean>
 */
export async function native(files: File[] = [], title: string = '', text: string = '', url: string = ''): Promise<boolean> {
	let shareData = {
		files,
		text,
		title,
		url,
	};

	// Check if this browser supports share
	if (hasSupport() === false) {
		throw new Error('This browser does not support navigator share');
	}

	// Check if we have ability
	if (canShare() === false) {
		throw new Error('Sharing is not supported, make sure you are on HTTPS');
	}

	// Check if we are capable of sharing this data
	if (!navigator.canShare(shareData)) {
		return false;
	}

	// Attempt to share data
	await navigator.share(shareData);

	// Assume success
	return true;
}

/**
 * @param string remoteFileUrl
 * @param string title
 * @param string text
 * @param string url
 * @return Promise<File>
 */
export async function remoteFile(remoteFileUrl: string, title: string = '', text: string = '', url: string = ''): Promise<boolean> {
	// Fetch the file
	const file: File = await fetchRemoteImage(remoteFileUrl);

	// Share
	return native([file], title, text, url);
}

/**
 * @return boolean
 */
export function hasSupport(): boolean {
	return 'share' in navigator;
}

/**
 * @return boolean
 */
export function canShare(): boolean {
	return hasSupport() && !!navigator.canShare;
}

/**
 * @param string url
 * @param string filename
 * @return File
 */
async function fetchRemoteImage(url: string = '', filename: string = 'my-file.png'): Promise<File> {
	// Use default image if one is not set
	if (!url) {
		url = 'https://cdn.glitch.com/f96f78ec-d35d-447b-acf4-86f2b3658491%2Fchuck.png?v=1618311092497';
	}

	// Fetch remote file as a blob
	const blob = await fetch(url).then((response) => response.blob());

	// Convert blob to File
	const mimeType = blob.type.split(';').shift();
	const file = new File([blob], filename, {
		type: mimeType,
	});

	return file;
}
