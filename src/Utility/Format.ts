type TimeInput = Date | string | number;

/**
 * Convert bytes to human readable format
 *
 * @param bytes
 * @returns string
 */
export function bytesToSize(bytes: number): string {
	// Using modern ES syntax
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (bytes === 0) {
		return '0 Byte';
	}

	const exponent = Math.floor(Math.log(bytes) / Math.log(1024));
	const value = Math.round(bytes / Math.pow(1024, exponent));

	return `${value} ${sizes[exponent]}`;
}

/**
 * Get amount of days between two dates
 *
 * @param Date date1
 * @param Date date2
 * @return number
 */
export function daysBetweenDates(date1: Date, date2: Date): number {
	const timeDifference = Math.abs(date2.getTime() - date1.getTime());
	const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

	return daysDifference;
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
 * Normalize MySQL-style and ISO date strings into Date objects
 *
 * @param input - String datetime
 * @returns Date | null
 */
export function normalizeDateString(input: string): Date | null {
	const isoString = input.includes(' ') && !input.includes('T') ? input.replace(' ', 'T') + (input.length === 19 ? 'Z' : '') : input;
	const date = new Date(isoString);

	return isNaN(date.getTime()) ? null : date;
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
		if (timeParts.length === 3 && timeParts.every((number) => !isNaN(number))) {
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
	const difference = Math.abs(type === 'ago' ? now.getTime() - parsedDate.getTime() : parsedDate.getTime() - now.getTime());
	const seconds = Math.floor(difference / 1000);

	const intervals = {
		day: 86400,
		hour: 3600,
		minute: 60,
		month: 2592000,
		second: 1,
		year: 31536000,
	};

	const units = {
		day: shortUnits ? 'd' : 'day',
		hour: shortUnits ? 'h' : 'hour',
		minute: shortUnits ? 'm' : 'minute',
		month: shortUnits ? 'mo' : 'month',
		second: shortUnits ? 's' : 'second',
		year: shortUnits ? 'y' : 'year',
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

/**
 * Safely convert a raw input to a Date, or return null
 *
 * @param input
 * @returns Date | null
 */
export function toDate(input: TimeInput): Date | null {
	return parseTimeInput(input);
}

/**
 * Convert a time input to a normalized ISO string
 *
 * @param input
 * @returns string
 */
export function toISOString(input: TimeInput): string {
	const date = toDate(input);
	return date ? date.toISOString() : '';
}

/**
 * Format a Date object into a string representation
 *
 * Example:
 * 	formatTime(new Date(), 'dddd, MMMM DD, YYYY HH:mm:ss'); // Tuesday, March 15, 2024 14:30:00
 * 	formatTime(new Date(), 'MM/DD/YY h:mm a'); // 03/15/24 2:30 pm
 *
 * @param date|string The Date object to format
 * @param format The format string using tokens (YYYY-MM-DD HH:mm:ss)
 * @return Formatted date string, or empty string if invalid date
 */
export function formatTime(dateInput: Date | string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
	let date: Date;

	if (typeof dateInput === 'string') {
		const normalizedDate = normalizeDateString(dateInput);

		if (!normalizedDate) {
			return '';
		}

		date = normalizedDate;
	} else if (dateInput instanceof Date) {
		date = dateInput;
	} else {
		return '';
	}

	if (isNaN(date.getTime())) {
		return '';
	}

	if (!(date instanceof Date) || isNaN(date.getTime())) {
		return '';
	}

	/**
	 * Pad a number with leading zeros to ensure two digits
	 *
	 * @param number The number to pad
	 * @return Zero-padded string representation
	 */
	const padWithZero = (number: number): string => {
		return number.toString().padStart(2, '0');
	};

	/**
	 * Get the month as a 3-letter abbreviation
	 *
	 * @param monthIndex The month index (0-11)
	 * @return Month abbreviation string
	 */
	const getMonthAbbreviation = (monthIndex: number): string => {
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return monthNames[monthIndex];
	};

	/**
	 * Get the month as full name
	 *
	 * @param monthIndex The month index (0-11)
	 * @return Full month name string
	 */
	const getMonthName = (monthIndex: number): string => {
		const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return monthNames[monthIndex];
	};

	/**
	 * Get the day of week as 3-letter abbreviation
	 *
	 * @param dayIndex The day index (0-6) where 0 is Sunday
	 * @return Day abbreviation string
	 */
	const getDayAbbreviation = (dayIndex: number): string => {
		const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return dayNames[dayIndex];
	};

	/**
	 * Get the day of week as full name
	 *
	 * @param dayIndex The day index (0-6) where 0 is Sunday
	 * @return Full day name string
	 */
	const getDayName = (dayIndex: number): string => {
		const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return dayNames[dayIndex];
	};

	/**
	 * Get 12-hour format hours
	 *
	 * @param hours The 24-hour format hours
	 * @return Hours in 12-hour format
	 */
	const getTwelveHourFormat = (hours: number): number => {
		return hours % 12 || 12;
	};

	/**
	 * Get AM/PM indicator
	 *
	 * @param hours The 24-hour format hours
	 * @return AM or PM string
	 */
	const getMeridiemIndicator = (hours: number): string => {
		return hours < 12 ? 'AM' : 'PM';
	};

	// Token replacements for formatting
	const tokenReplacements: Record<string, string> = {
		A: getMeridiemIndicator(date.getHours()),
		D: date.getDate().toString(),
		DD: padWithZero(date.getDate()),
		H: date.getHours().toString(),
		HH: padWithZero(date.getHours()),
		M: (date.getMonth() + 1).toString(),
		MM: padWithZero(date.getMonth() + 1),
		MMM: getMonthAbbreviation(date.getMonth()),
		MMMM: getMonthName(date.getMonth()),
		YY: date.getFullYear().toString().slice(-2),
		YYYY: date.getFullYear().toString(),
		a: getMeridiemIndicator(date.getHours()).toLowerCase(),
		ddd: getDayAbbreviation(date.getDay()),
		dddd: getDayName(date.getDay()),
		h: getTwelveHourFormat(date.getHours()).toString(),
		hh: padWithZero(getTwelveHourFormat(date.getHours())),
		m: date.getMinutes().toString(),
		mm: padWithZero(date.getMinutes()),
		s: date.getSeconds().toString(),
		ss: padWithZero(date.getSeconds()),
	};

	// Create regex pattern for all tokens, ordered by length (longest first)
	const tokenPattern = Object.keys(tokenReplacements)
		.sort((a, b) => b.length - a.length)
		.join('|');

	const regex = new RegExp(tokenPattern, 'g');

	return format.replace(regex, (match) => tokenReplacements[match]);
}
