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
		// Create the extended class
		const extendedClass = class extends constructor {
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

		// Copy all prototype properties from the original constructor to the new class
		// This ensures methods like toJSON are properly preserved
		const originalPrototype = constructor.prototype;
		Object.getOwnPropertyNames(originalPrototype).forEach((name) => {
			if (name !== 'constructor') {
				const descriptor = Object.getOwnPropertyDescriptor(originalPrototype, name);
				if (descriptor) {
					Object.defineProperty(extendedClass.prototype, name, descriptor);
				}
			}
		});

		return extendedClass;
	};
}
