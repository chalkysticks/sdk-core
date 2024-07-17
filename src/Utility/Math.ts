import Easing, { getEasingMethod } from './Easing';

/**
 * @param number x1
 * @param number y1
 * @param number x2
 * @param number y2
 * @returns number
 */
export function angle(x1: number, y1: number, x2: number, y2: number): number {
	return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * @param number x1
 * @param number y1
 * @param number x2
 * @param number y2
 * @returns number
 */
export function angleAsDegrees(x1: number, y1: number, x2: number, y2: number): number {
	return (angle(x1, y1, x2, y2) * 180) / Math.PI;
}

/**
 * @param number a
 * @param number b
 * @returns number
 */
export function angleDifference(a: number, b: number): number {
	return Math.atan2(Math.sin(b - a), Math.cos(b - a));
}

/**
 * @param number a
 * @param number b
 * @returns number
 */
export function angleDifferenceAsDegrees(a: number, b: number): number {
	return (angleDifference(a, b) * 180) / Math.PI;
}

/**
 * @param number value
 * @param number min
 * @param number max
 * @param boolean useClamp
 * @returns number
 */
export function normalize(value: number, min: number, max: number, useClamp: boolean = false): number {
	let output = (value - min) / (max - min);

	if (useClamp) {
		output = clamp(output, min, max);
	}

	return output;
}

/**
 * @param number value
 * @param number min
 * @param number max
 * @param boolean useClamp
 * @returns number
 */
export function denormalize(value: number, min: number, max: number, useClamp: boolean = false): number {
	let output = value * (max - min) + min;

	if (useClamp) {
		output = clamp(output, min, max);
	}

	return output;
}

/**
 * @param number x1
 * @param number y1
 * @param number x2
 * @param number y2
 * @returns number
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Clamp
 *
 * @param number value
 * @param number min
 * @param number max
 * @returns number
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Lerp
 *
 * @param number a
 * @param number b
 * @param number t
 * @returns number
 */
export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

/**
 * Smoothstep
 *
 * Creating smooth transitions in animations or camera movements
 *
 * const startValue = 0;
 * const endValue = 100;
 * const currentValue = 75; // Example current value
 * const smoothedValue = smoothstep(startValue, endValue, currentValue);
 * console.log(smoothedValue); // Output: 0.75
 *
 * @param number min
 * @param number max
 * @param number value
 * @returns number
 */
export function smoothstep(min: number, max: number, value: number): number {
	const x = clamp((value - min) / (max - min), 0, 1);
	return x * x * (3 - 2 * x);
}

/**
 * Smootherstep
 *
 * @param number min
 * @param number max
 * @param number value
 * @returns number
 */
export function smootherstep(min: number, max: number, value: number): number {
	const x = clamp((value - min) / (max - min), 0, 1);
	return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * Inverse Lerp
 *
 * Finding the progress between two values given a specific value within that
 * range. For instance, determining how far along a player has moved between
 * two checkpoints
 *
 * const checkpointStart = 0;
 * const checkpointEnd = 100;
 * const playerPosition = 75; // Example player position
 * const progress = inverseLerp(checkpointStart, checkpointEnd, playerPosition);
 *
 * @param number a
 * @param number b
 * @param number value
 * @returns number
 */
export function inverseLerp(a: number, b: number, value: number): number {
	return (value - a) / (b - a);
}

/**
 * Remap
 *
 * Converting a value from one scale to another. For example, mapping a temperature value from Celsius to Fahrenheit.
 *
 * const celsiusTemperature = 20; // Example temperature in Celsius
 * const minCelsius = -20;
 * const maxCelsius = 40;
 * const minFahrenheit = 32;
 * const maxFahrenheit = 104;
 * const fahrenheitTemperature = remap(celsiusTemperature, minCelsius, maxCelsius, minFahrenheit, maxFahrenheit);
 *
 * @param number value
 * @param number a
 * @param number b
 * @param number c
 * @param number d
 * @returns number
 */
export function remap(value: number, a: number, b: number, c: number, d: number): number {
	return c + (d - c) * inverseLerp(a, b, value);
}

/**
 * Random Range
 *
 * @param number min
 * @param number max
 * @returns number
 */
export function randomRange(min: number, max: number): number {
	return lerp(min, max, Math.random());
}

/**
 * Random Int
 *
 * @param number min
 * @param number max
 * @returns number
 */
export function randomInt(min: number, max: number): number {
	return Math.floor(randomRange(min, max + 1));
}

/**
 * Random Sign
 *
 * @returns number
 */
export function randomSign(): number {
	return Math.random() < 0.5 ? -1 : 1;
}

/**
 * @param number x
 * @param number y
 * @param number angle
 * @returns [number, number]
 */
export function rotate(x: number, y: number, angle: number): [number, number] {
	const s = Math.sin(angle);
	const c = Math.cos(angle);
	return [x * c - y * s, x * s + y * c];
}

/**
 * @param number x
 * @param number y
 * @param number angle
 * @returns [number, number]
 */
export function rotateDeg(x: number, y: number, angle: number): [number, number] {
	return rotate(x, y, (angle * Math.PI) / 180);
}

/**
 * @param number value
 * @param number decimals
 * @return number
 */
export function round(value: number, decimals: number = 2): number {
	return Number(value.toFixed(decimals));
}

/**
 * Round to nearest number
 *
 * @param number value
 * @param number nearest
 * @returns number
 */
export function roundToNearest(value: number, nearest: number): number {
	return Math.round(value / nearest) * nearest;
}

/**
 * Round to nearest fraction
 *
 * @param number value
 * @param number fraction
 * @returns number
 */
export function roundToNearestFraction(value: number, fraction: number): number {
	return Math.round(value * fraction) / fraction;
}

/**
 * Round to decimal
 *
 * @param number value
 * @param number decimals
 * @returns number
 */
export function roundToDecimal(value: number, decimals: number): number {
	return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

/**
 * Convert degrees to radians
 *
 * @param number degrees
 * @returns number
 */
export function toRadians(degrees: number): number {
	return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 *
 * @param number radians
 * @returns number
 */
export function toDegrees(radians: number): number {
	return (radians * 180) / Math.PI;
}

/**
 * Converts a normalized number like 0 - 1 into a ramped range, like 0 - 1 - 0.
 *
 * It's useful for having something enter early, hold, then exit. If we do
 * by = 4, it will enter at 0.25, hold until 0.75, then exit.
 *
 * Example:
 *
 * 	const newRatio = transformRatio(ratio, 4, 'easeInQuad', 'easeOutQuad');
 *
 * @param number ratio
 * @param number by
 * @param string easeInFunction
 * @param string easeOutFunction
 * @return number
 */
export function transformRatio(ratio: number, by: number = 4, easeInFunction: string = 'linear', easeOutFunction: string = ''): number {
	if (!easeOutFunction) {
		easeOutFunction = easeInFunction;
	}

	const easeInMethod = getEasingMethod(easeInFunction);
	const easeOutMethod = getEasingMethod(easeOutFunction);

	if (ratio <= 1 / by) {
		return easeInMethod(ratio / (1 / by));
	} else if (ratio <= 1 - 1 / by) {
		return 1;
	} else {
		return easeOutMethod((1 - ratio) / (1 / by));
	}
}

// export function transformRatio(ratio: number, by: number = 4, easing: string = 'linear'): number {
// 	const easingMethod = getEasingMethod(easing);

// 	return ratio <= 1 / by ? by * ratio : ratio <= 1 - 1 / by ? 1 : by - by * ratio;
// }
