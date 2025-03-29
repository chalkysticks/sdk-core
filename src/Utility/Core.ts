/**
 * Class decorator that sets up meta property getters/setters
 */
export function RelationshipProperties(
	propertyConfigs: Record<
		string,
		{
			key?: string;
			relationship?: string;
			value?: string;
		}
	>,
) {
	return function <T extends { new (...args: any[]): any }>(constructor: T) {
		return class extends constructor {
			constructor(...args: any[]) {
				super(...args);

				for (const [propName, config] of Object.entries(propertyConfigs)) {
					const collection = config.relationship || 'meta';
					const metaKey = config.key || propName;
					const hasStaticValue = 'value' in config;

					// Check if property already exists
					const propExists = this[propName] !== undefined;
					const actualPropName = propExists ? `$${propName}` : propName;

					Object.defineProperty(this, actualPropName, {
						configurable: true,
						enumerable: false,
						get: function () {
							if (!this[collection]?.findWhere) return this.attr(propName);

							const item = this[collection].findWhere({ key: metaKey });
							return item ? item.getValue() : this.attr(propName);
						},
						set: function (value) {
							if (!this[collection]?.findWhere) return;

							// If a static value is provided, always use that instead of the given value
							const valueToSet = hasStaticValue ? config.value : value;
							const item = this[collection].findWhere({ key: metaKey });

							if (item) {
								item.set({ value: valueToSet });
							} else if (this[collection].add) {
								this[collection].add({ key: metaKey, value: valueToSet });
							}
						},
					});
				}
			}
		};
	};
}
