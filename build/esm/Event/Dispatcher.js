import { DispatcherEvent } from './DispatcherEvent';
export class Dispatcher {
    constructor() {
        this.events = {};
    }
    dispatch(eventName, data = {}) {
        const event = this.events[eventName];
        event &&
            event.fire({
                data: data,
                event: {
                    name: eventName,
                    time: Date.now(),
                },
                target: this,
            });
    }
    on(eventName, callback) {
        let event = this.events[eventName];
        if (!event) {
            event = new DispatcherEvent(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(callback);
    }
    once(eventName, callback) {
        const onceCallback = (envelope) => {
            callback(envelope);
            this.off(eventName, onceCallback);
        };
        this.on(eventName, onceCallback);
    }
    off(eventName, callback) {
        const event = this.events[eventName];
        if (event && !callback) {
            event.clearCallbacks();
            delete this.events[eventName];
        }
        else if (event && callback && event.callbacks.indexOf(callback) > -1) {
            event.unregisterCallback(callback);
            if (event.callbacks.length === 0) {
                delete this.events[eventName];
            }
        }
    }
    $emit(eventName, data = {}) {
        return this.dispatch(eventName, data);
    }
    trigger(eventName, data = {}) {
        return this.dispatch(eventName, data);
    }
    $on(eventName, callback) {
        return this.on(eventName, callback);
    }
    $off(eventName, callback) {
        return this.off(eventName, callback);
    }
}
export default new Dispatcher();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FdmVudC9EaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQTBELE1BQU0sbUJBQW1CLENBQUM7QUFtQzVHLE1BQU0sT0FBTyxVQUFVO0lBQXZCO1FBSVcsV0FBTSxHQUFvQyxFQUFFLENBQUM7SUFxSHhELENBQUM7SUE5R08sUUFBUSxDQUFDLFNBQWlCLEVBQUUsT0FBd0IsRUFBRTtRQUM1RCxNQUFNLEtBQUssR0FBb0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQW9CLENBQUM7UUFFekUsS0FBSztZQUNKLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFO29CQUNOLElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO2lCQUNoQjtnQkFDRCxNQUFNLEVBQUUsSUFBSTthQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFPTSxFQUFFLENBQUMsU0FBaUIsRUFBRSxRQUE2QjtRQUN6RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR25DLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNaLEtBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDO1FBR0QsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFPTSxJQUFJLENBQUMsU0FBaUIsRUFBRSxRQUE2QjtRQUMzRCxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQTBCLEVBQUUsRUFBRTtZQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQU9NLEdBQUcsQ0FBQyxTQUFpQixFQUFFLFFBQThCO1FBQzNELE1BQU0sS0FBSyxHQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBb0IsQ0FBQztRQUd6RSxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsQ0FBQzthQUdJLElBQUksS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3RFLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVuQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0lBVU0sS0FBSyxDQUFDLFNBQWlCLEVBQUUsT0FBd0IsRUFBRTtRQUN6RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFPTSxPQUFPLENBQUMsU0FBaUIsRUFBRSxPQUF3QixFQUFFO1FBQzNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU9NLEdBQUcsQ0FBQyxTQUFpQixFQUFFLFFBQTZCO1FBQzFELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQU9NLElBQUksQ0FBQyxTQUFpQixFQUFFLFFBQTZCO1FBQzNELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUdEO0FBTUQsZUFBZSxJQUFJLFVBQVUsRUFBRSxDQUFDIn0=