export function RelationshipProperties(propertyConfigs) {
    return function (constructor) {
        return class extends constructor {
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
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9VdGlsaXR5L0NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxVQUFVLHNCQUFzQixDQUNyQyxlQU9DO0lBRUQsT0FBTyxVQUFtRCxXQUFjO1FBQ3ZFLE9BQU8sS0FBTSxTQUFRLFdBQVc7WUFDL0IsWUFBWSxHQUFHLElBQVc7Z0JBQ3pCLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUVmLEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7b0JBQ2xFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDO29CQUNqRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQztvQkFDdkMsTUFBTSxjQUFjLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQztvQkFHekMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFNBQVMsQ0FBQztvQkFDaEQsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7b0JBRTlELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTt3QkFDM0MsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLFVBQVUsRUFBRSxLQUFLO3dCQUNqQixHQUFHLEVBQUU7NEJBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxTQUFTO2dDQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFFN0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDOzRCQUMxRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNyRCxDQUFDO3dCQUNELEdBQUcsRUFBRSxVQUFVLEtBQUs7NEJBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsU0FBUztnQ0FBRSxPQUFPOzRCQUd6QyxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzs0QkFDekQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDOzRCQUUxRCxJQUFJLElBQUksRUFBRSxDQUFDO2dDQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzs0QkFDakMsQ0FBQztpQ0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7NEJBQzNELENBQUM7d0JBQ0YsQ0FBQztxQkFDRCxDQUFDLENBQUM7Z0JBQ0osQ0FBQztZQUNGLENBQUM7U0FDRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyJ9