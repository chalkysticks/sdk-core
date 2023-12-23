import { DispatcherEvent } from './DispatcherEvent.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FdmVudC9EaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQTBELE1BQU0sc0JBQXNCLENBQUM7QUFtQy9HLE1BQU0sT0FBTyxVQUFVO0lBQXZCO1FBSWMsV0FBTSxHQUFvQyxFQUFFLENBQUM7SUFxSDNELENBQUM7SUE5R1UsUUFBUSxDQUFDLFNBQWlCLEVBQUUsT0FBd0IsRUFBRTtRQUN6RCxNQUFNLEtBQUssR0FBb0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQW9CLENBQUM7UUFFekUsS0FBSztZQUNELEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO2lCQUNuQjtnQkFDRCxNQUFNLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztJQUNYLENBQUM7SUFPTSxFQUFFLENBQUMsU0FBaUIsRUFBRSxRQUE2QjtRQUN0RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR25DLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNULEtBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNuQyxDQUFDO1FBR0QsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFPTSxJQUFJLENBQUMsU0FBaUIsRUFBRSxRQUE2QjtRQUN4RCxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQTBCLEVBQUUsRUFBRTtZQUNoRCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQU9NLEdBQUcsQ0FBQyxTQUFpQixFQUFFLFFBQThCO1FBQ3hELE1BQU0sS0FBSyxHQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBb0IsQ0FBQztRQUd6RSxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsQ0FBQzthQUdJLElBQUksS0FBSyxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ25FLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVuQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBVU0sS0FBSyxDQUFDLFNBQWlCLEVBQUUsT0FBd0IsRUFBRTtRQUN0RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFPTSxPQUFPLENBQUMsU0FBaUIsRUFBRSxPQUF3QixFQUFFO1FBQ3hELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQU9NLEdBQUcsQ0FBQyxTQUFpQixFQUFFLFFBQTZCO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQU9NLElBQUksQ0FBQyxTQUFpQixFQUFFLFFBQTZCO1FBQ3hELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUdKO0FBTUQsZUFBZSxJQUFJLFVBQVUsRUFBRSxDQUFDIn0=