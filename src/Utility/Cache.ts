/**
 * @type interface
 */
interface ICachedItem {
	immutable: boolean;
	time: number;
	ttl: number;
	value: any;
}

/**
 * Cache is a simple key/value store with TTL support
 *
 * Example Usage:
 *
 * 	const cache: Cache = new Cache();
 *
 * 	cache.set('foo', 'bar', 1000);
 * 	cache.set('foo', 'baz', 1000, true);
 *
 * 	const value = cache.get('foo');
 * 	console.log(value); // bar
 *
 * 	cache.delete('foo');
 * 	console.log(cache.get('foo')); // undefined
 *
 * @author Matt Kenefick<matt@chalkysticks.com>
 * @package Utility
 * @project ChalkySticks SDK Core
 */
export class Cache {
	/**
	 * @type Record<string, ICachedItem>
	 */
	private storage: Record<string, ICachedItem> = {};

	/**
	 * Default TTL
	 *
	 * @type number ttl
	 */
	private ttl: number;

	/**
	 * @param number ttl
	 */
	constructor(ttl: number = -1) {
		this.ttl = ttl > 0 ? ttl : 0;
	}

	/**
	 * @return Record<string, ICachedItem>
	 */
	public all(): Record<string, ICachedItem> {
		const keys: string[] = Object.keys(this.storage);
		const output: any = {};
		let value: any;

		for (const key of keys) {
			value = this.get(key);

			if (value !== undefined) {
				output[key] = this.get(key);
			}
		}

		return output;
	}

	/**
	 * @param string key
	 * @return void
	 */
	public delete(key: string): void {
		if (this.storage[key]) {
			delete this.storage[key];
		}
	}

	/**
	 * @param string key
	 * @return any
	 */
	public get(key: string): any {
		// Check time on it
		const item: ICachedItem = this.storage[key];
		let value: any;

		// Does item exist?
		if (!item) {
			value = undefined;
		}

		// Check if it's a 0 expiration (first-access)
		else if (item.ttl === 0) {
			value = item.value;
			this.delete(key);
		}

		// Check if it's healthy within the TTL
		else if (this.isCachedItemHealthy(item)) {
			value = item.value;
		}

		return value;
	}

	/**
	 * Checks whether or not a cached item exists at all without
	 * regard to the TTL
	 *
	 * @param string key
	 * @return boolean
	 */
	public exists(key: string): boolean {
		return this.storage[key] !== undefined;
	}

	/**
	 * Checks if we have a cached item within our TTL
	 *
	 * @param string key
	 * @return boolean
	 */
	public has(key: string): boolean {
		return this.get(key) !== undefined;
	}

	/**
	 * Returns false if trying to overwrite existing cache when
	 * overwrite is set to false
	 *
	 * @param string key
	 * @param any value
	 * @param number ttl
	 * @param boolean overwrite
	 * @return boolean
	 */
	public set(key: string, value: any, ttl: number = 0, immutable: boolean = false): boolean {
		const hasItem: boolean = this.has(key);
		const time: number = Date.now();

		// Do not overwrite existing item
		if (hasItem && this.isImmutable(key)) {
			return false;
		}

		// Set cache
		this.storage[key] = {
			immutable,
			time,
			ttl,
			value,
		};

		return true;
	}

	/**
	 * @param ICachedItem item
	 * @return boolean
	 */
	private isCachedItemHealthy(item: ICachedItem): boolean {
		const now: number = Date.now();
		const then: number = item.time;
		const ttl: number = item.ttl;

		return then + ttl > now;
	}

	/**
	 * @param string key
	 * @return boolean
	 */
	private isImmutable(key: string): boolean {
		const item: ICachedItem = this.storage[key];
		return !!item?.immutable;
	}
}
