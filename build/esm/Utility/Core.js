export function RelationshipProperties(propertyConfigs) {
    return function (constructor) {
        const extendedClass = class extends constructor {
            constructor(...args) {
                super(...args);
                for (const [propName, config] of Object.entries(propertyConfigs)) {
                    const collection = config.relationship || 'meta';
                    const metaKey = config.key || propName;
                    const hasStaticValue = 'value' in config;
                    const propExists = this[propName] !== undefined;
                    const actualPropName = propExists ? `$${propName}` : propName;
                    Object.defineProperty(this, actualPropName, {
                        configurable: true,
                        enumerable: false,
                        get: function () {
                            if (!this[collection]?.findWhere)
                                return this.attr(propName);
                            const item = this[collection].findWhere({ key: metaKey });
                            return item ? item.getValue() : this.attr(propName);
                        },
                        set: function (value) {
                            if (!this[collection]?.findWhere)
                                return;
                            const valueToSet = hasStaticValue ? config.value : value;
                            const item = this[collection].findWhere({ key: metaKey });
                            if (item) {
                                item.set({ value: valueToSet });
                            }
                            else if (this[collection].add) {
                                this[collection].add({ key: metaKey, value: valueToSet });
                            }
                        },
                    });
                }
            }
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9VdGlsaXR5L0NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxVQUFVLHNCQUFzQixDQUNyQyxlQU9DO0lBRUQsT0FBTyxVQUFtRCxXQUFjO1FBRXZFLE1BQU0sYUFBYSxHQUFHLEtBQU0sU0FBUSxXQUFXO1lBQzlDLFlBQVksR0FBRyxJQUFXO2dCQUN6QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFFZixLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO29CQUNsRSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQztvQkFDakQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUM7b0JBQ3ZDLE1BQU0sY0FBYyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUM7b0JBR3pDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLENBQUM7b0JBQ2hELE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUU5RCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7d0JBQzNDLFlBQVksRUFBRSxJQUFJO3dCQUNsQixVQUFVLEVBQUUsS0FBSzt3QkFDakIsR0FBRyxFQUFFOzRCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsU0FBUztnQ0FBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBRTdELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFDMUQsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDckQsQ0FBQzt3QkFDRCxHQUFHLEVBQUUsVUFBVSxLQUFLOzRCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFNBQVM7Z0NBQUUsT0FBTzs0QkFHekMsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7NEJBQ3pELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQzs0QkFFMUQsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDVixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7NEJBQ2pDLENBQUM7aUNBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0NBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDOzRCQUMzRCxDQUFDO3dCQUNGLENBQUM7cUJBQ0QsQ0FBQyxDQUFDO2dCQUNKLENBQUM7WUFDRixDQUFDO1NBQ0QsQ0FBQztRQUlGLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNoRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM5RCxJQUFJLElBQUksS0FBSyxhQUFhLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLFVBQVUsRUFBRSxDQUFDO29CQUNoQixNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNsRSxDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUM7SUFDdEIsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyJ9