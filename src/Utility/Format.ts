type TimeInput = Date | string | number;

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
 * Convert any time input to Date object
 *
 * @param input - Date, timestamp, ISO string, or seconds
 * @returns Date object or null if invalid
 */
function parseTimeInput(input: TimeInput): Date | null {
	if (input instanceof Date) {
		return isNaN(input.getTime()) ? null : input;
	}

	if (typeof input === 'string') {
		// Try parsing as ISO date string
		const date = new Date(input);
		if (!isNaN(date.getTime())) {
			return date;
		}

		// Try parsing as "HH:MM:SS"
		const timeParts = input.split(':').map(Number);
		if (timeParts.length === 3 && timeParts.every((n) => !isNaN(n))) {
			const now = new Date();
			return new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeParts[0], timeParts[1], timeParts[2]);
		}
	}

	if (typeof input === 'number') {
		// If number is in seconds (less than year 2000 in milliseconds)
		if (input < 946684800000) {
			return new Date(Date.now() + input * 1000);
		}
		// Assume milliseconds timestamp
		return new Date(input);
	}

	return null;
}

/**
 * Convert time to human readable format
 *
 * @param time - Time as Date, timestamp, ISO string, "HH:MM:SS", or seconds
 * @param hideEmptyUnits - Optional: hide units that are 0 (default: false)
 * @returns string in format "Xh Ym Zs" or "" if invalid input
 */
export function timeToHuman(time: TimeInput, hideEmptyUnits: boolean = false): string {
	let totalSeconds: number;

	if (typeof time === 'string') {
		// Try parsing as "HH:MM:SS" first
		const parts = time.split(':').map(Number);
		if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
			totalSeconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
		} else {
			// Try parsing as date string
			const date = parseTimeInput(time);
			if (!date) return '';
			totalSeconds = Math.floor((date.getTime() - Date.now()) / 1000);
		}
	} else if (time instanceof Date) {
		totalSeconds = Math.floor((time.getTime() - Date.now()) / 1000);
	} else {
		// If number is in milliseconds (greater than year 2000)
		if (time > 946684800000) {
			totalSeconds = Math.floor((time - Date.now()) / 1000);
		} else {
			totalSeconds = time;
		}
	}

	const hours = Math.floor(Math.abs(totalSeconds) / 3600);
	const minutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
	const seconds = Math.floor(Math.abs(totalSeconds) % 60);

	if (hideEmptyUnits) {
		const parts = [];
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0) parts.push(`${minutes}m`);
		if (seconds > 0) parts.push(`${seconds}s`);
		return parts.join(' ') || '0s';
	}

	return `${hours}h ${minutes}m ${seconds}s`;
}

/**
 * Get relative time description
 *
 * @param date - Target time as Date, timestamp, ISO string, or seconds
 * @param options - Configuration options
 * @returns Formatted string describing the time difference
 */
export function getRelativeTime(
	date: TimeInput,
	options: {
		type?: 'ago' | 'until';
		suffix?: string;
		shortUnits?: boolean;
	} = {},
): string {
	const parsedDate = parseTimeInput(date);
	if (!parsedDate) {
		return '';
	}

	const { type = 'ago', suffix = '', shortUnits = false } = options;

	const now = new Date();
	const isPast = parsedDate < now;

	const diff = Math.abs(type === 'ago' ? now.getTime() - parsedDate.getTime() : parsedDate.getTime() - now.getTime());

	const seconds = Math.floor(diff / 1000);

	const intervals = {
		year: 31536000,
		month: 2592000,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	const units = {
		year: shortUnits ? 'y' : 'year',
		month: shortUnits ? 'mo' : 'month',
		day: shortUnits ? 'd' : 'day',
		hour: shortUnits ? 'h' : 'hour',
		minute: shortUnits ? 'm' : 'minute',
		second: shortUnits ? 's' : 'second',
	};

	for (const [unit, secondsInUnit] of Object.entries(intervals)) {
		const interval = seconds / secondsInUnit;

		if (interval >= 1) {
			const value = Math.floor(interval);
			const unitName = units[unit as keyof typeof units];
			const pluralUnit = !shortUnits && value !== 1 ? unitName + 's' : unitName;

			const timePart = `${value} ${pluralUnit}`;

			if (!suffix) {
				return timePart;
			}

			return `${timePart} ${suffix}`.trim();
		}
	}

	const zeroUnit = shortUnits ? '0s' : '0 seconds';
	return suffix ? `${zeroUnit} ${suffix}`.trim() : zeroUnit;
}

/**
 * Get time ago description
 *
 * @param TimeInput date
 * @param string type
 * @param string suffix
 * @return string
 */
export function timeAgo(date: TimeInput, type: string = 'ago', suffix: string = 'ago'): string {
	return getRelativeTime(date, {
		suffix: 'ago',
		type: 'ago',
	});
}

/**
 * Get time until description
 *
 * @param TimeInput date
 * @param string type
 * @param string suffix
 * @return string
 */
export function timeUntil(date: TimeInput, type: string = 'until', suffix: string = 'left'): string {
	return getRelativeTime(date, {
		suffix: 'left',
		type: 'until',
	});
}
