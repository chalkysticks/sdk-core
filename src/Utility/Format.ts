/**
 * Convert bytes to human readable format
 *
 * @param bytes
 * @returns string
 */
export function bytesToSize(bytes: number): string {
	let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (bytes == 0) return '0 Byte';

	let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());

	return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

/**
 * Get amount of days between two dates
 *
 * @param Date date1
 * @param Date date2
 * @return number
 */
export function daysBetweenDates(date1: Date, date2: Date): number {
	const timeDiff = Math.abs(date2.getTime() - date1.getTime());
	return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * Convert seconds to time format
 *
 * @param seconds
 * @param format
 * @returns string
 */
export function secondsToTime(seconds: number, format: string = '00:00:00'): string {
	let date = new Date(0);
	date.setSeconds(seconds);

	switch (format) {
		case '00:00:00':
			return date.toISOString().substr(11, 8);

		case '00:00':
			return date.toISOString().substr(14, 5);

		case '00':
			return date.toISOString().substr(17, 2);
	}

	return date.toISOString().substr(11, 8);
}

/**
 * Convert time to seconds
 *
 * @param time
 * @returns number
 */
export function timeToSeconds(time: string): number {
	let [hours, minutes, seconds] = time.split(':').map(Number);

	return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Convert time to human readable format
 *
 * @param time
 * @returns string
 */
export function timeToHuman(time: string): string {
	let [hours, minutes, seconds] = time.split(':').map(Number);

	return `${hours}h ${minutes}m ${seconds}s`;
}

/**
 * @param Date date
 * @return string
 */
export function timeAgo(date: Date): string {
	let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years ago';
	}

	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months ago';
	}

	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days ago';
	}

	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours ago';
	}

	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes ago';
	}

	return Math.floor(seconds) + ' seconds ago';
}
