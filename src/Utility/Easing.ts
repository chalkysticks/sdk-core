/**
 * @author Matt Kenefick<matt@chalkysticks.com>
 * @package Library
 * @project ChalkySticks SDK Core
 */
export class EasingFunction {
	/**
	 * @param number t
	 * @returns number
	 */
	static linear(t: number): number {
		return t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInQuad(t: number): number {
		return t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutQuad(t: number): number {
		return t * (2 - t);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutQuad(t: number): number {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInCubic(t: number): number {
		return t * t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutCubic(t: number): number {
		return --t * t * t + 1;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutCubic(t: number): number {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInQuart(t: number): number {
		return t * t * t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutQuart(t: number): number {
		return 1 - --t * t * t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutQuart(t: number): number {
		return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInQuint(t: number): number {
		return t * t * t * t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutQuint(t: number): number {
		return 1 + --t * t * t * t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutQuint(t: number): number {
		return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInSine(t: number): number {
		return 1 - Math.cos((t * Math.PI) / 2);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutSine(t: number): number {
		return Math.sin((t * Math.PI) / 2);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutSine(t: number): number {
		return -(Math.cos(Math.PI * t) - 1) / 2;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInExpo(t: number): number {
		return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutExpo(t: number): number {
		return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutExpo(t: number): number {
		if (t === 0) return 0;
		if (t === 1) return 1;
		if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
		return 0.5 * (-Math.pow(2, -10 * --t) + 2);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInCirc(t: number): number {
		return -(Math.sqrt(1 - t * t) - 1);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutCirc(t: number): number {
		return Math.sqrt(1 - --t * t);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutCirc(t: number): number {
		if ((t /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
		return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInBack(t: number, s: number = 1.70158): number {
		return t * t * ((s + 1) * t - s);
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeOutBack(t: number, s: number = 1.70158): number {
		return --t * t * ((s + 1) * t + s) + 1;
	}

	/**
	 * @param number t
	 * @returns number
	 */
	static easeInOutBack(t: number, s: number = 1.70158): number {
		if ((t /= 0.5) < 1) return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
		return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
	}
}

/**
 * Usage:
 *
 * 	// Normalize inOutQuad 0.0 - 1.0 when a value is 0.0 - 0.5
 * 	this.positions.microsoftPanel.width = 50 + Easing.easeInOutQuad(ratio.idle, 0.0, 0.5) * 50;
 *
 * Available Easings:
 *
 * 	linear
 * 	easeInQuad
 * 	easeOutQuad
 * 	easeInOutQuad
 * 	easeInQuart
 * 	easeOutQuart
 * 	easeInOutQuart
 * 	easeInQuint
 * 	easeOutQuint
 * 	easeInOutQuint
 * 	easeInCubic
 * 	easeOutCubic
 * 	easeInOutCubic
 * 	easeInSine
 * 	easeOutSine
 * 	easeInOutSine
 * 	easeInExpo
 * 	easeOutExpo
 * 	easeInOutExpo
 * 	easeInCirc
 * 	easeOutCirc
 * 	easeInOutCirc
 * 	easeInBack
 * 	easeOutBack
 * 	easeInOutBack
 *
 * @author Matt Kenefick<matt@chalkysticks.com>
 * @package Lib
 * @project Microsoft Case Study
 */
export default class Easing {
	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static linear(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.linear, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInQuad(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInQuad, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutQuad(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutQuad, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutQuad(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutQuad, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInQuart(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInQuart, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutQuart(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutQuart, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutQuart(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutQuart, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInQuint(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInQuint, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutQuint(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutQuint, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutQuint(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutQuint, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInCubic(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInCubic, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutCubic(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutCubic, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutCubic(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutCubic, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInSine(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInSine, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutSine(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutSine, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutSine(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutSine, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInExpo(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInExpo, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutExpo(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutExpo, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutExpo(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutExpo, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInCirc(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInCirc, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutCirc(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutCirc, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutCirc(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutCirc, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInBack(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInBack, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeOutBack(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeOutBack, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param boolean clamp
	 * @return number
	 */
	static easeInOutBack(value: number, min: number = 0, max: number = 1, clamp: boolean = true): number {
		return Easing.normalize(value, min, max, EasingFunction.easeInOutBack, clamp);
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @param (t: number) => number easingFn
	 * @param boolean clamp
	 * @returns number
	 */
	static normalize(value: number, min: number = 0, max: number = 1, easingFn: (t: number) => number, clamp: boolean = true): number {
		let t: number = Easing.clamp((value - min) / (max - min), 0, 1);
		let output: number = clamp ? easingFn(t) : min + (max - min) * easingFn(t);

		return output;
	}

	/**
	 * @param number value
	 * @param number min
	 * @param number max
	 * @returns number
	 */
	static clamp(value: number, min: number = 0, max: number = 1): number {
		return Math.min(Math.max(value, min), max);
	}
}

/**
 * @param string type
 * @return (t: number) => number
 */
export function getEasingMethod(type: string) {
	if (Easing.hasOwnProperty(type)) {
		return (Easing as any)[type];
	}

	return Easing.easeInOutQuad;
}
