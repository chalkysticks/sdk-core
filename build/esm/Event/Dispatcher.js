import { DispatcherEvent } from './DispatcherEvent';
export class Dispatcher {
    constructor() {
        this.events = {};
    }
    dispatch(eventName, data) {
        const event = this.events[eventName];
        if (event) {
            event.fire({
                data: data,
                event: {
                    name: eventName,
                    time: Date.now(),
                },
                target: this,
            });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FdmVudC9EaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQTBELE1BQU0sbUJBQW1CLENBQUM7QUFtQzVHLE1BQU0sT0FBTyxVQUFVO0lBQXZCO1FBSVcsV0FBTSxHQUF5QyxFQUFFLENBQUM7SUFzSDdELENBQUM7SUEvR08sUUFBUSxDQUFVLFNBQWlCLEVBQUUsSUFBUTtRQUNuRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBdUIsQ0FBQztRQUUzRCxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDVixJQUFJLEVBQUUsSUFBUztnQkFDZixLQUFLLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7aUJBQ2hCO2dCQUNELE1BQU0sRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1FBQ0osQ0FBQztJQUNGLENBQUM7SUFPTSxFQUFFLENBQVUsU0FBaUIsRUFBRSxRQUFnQztRQUNyRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBdUIsQ0FBQztRQUd6RCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWixLQUFLLEdBQUcsSUFBSSxlQUFlLENBQUksU0FBUyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUdELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBT00sSUFBSSxDQUFVLFNBQWlCLEVBQUUsUUFBZ0M7UUFDdkUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxRQUE2QixFQUFFLEVBQUU7WUFDdEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFPTSxHQUFHLENBQVUsU0FBaUIsRUFBRSxRQUFpQztRQUN2RSxNQUFNLEtBQUssR0FBdUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQXVCLENBQUM7UUFHL0UsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7YUFHSSxJQUFJLEtBQUssSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN0RSxLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFbkMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDbEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQVVNLEtBQUssQ0FBQyxTQUFpQixFQUFFLE9BQXdCLEVBQUU7UUFDekQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBT00sT0FBTyxDQUFDLFNBQWlCLEVBQUUsT0FBd0IsRUFBRTtRQUMzRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFPTSxHQUFHLENBQVUsU0FBaUIsRUFBRSxRQUFnQztRQUN0RSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFPTSxJQUFJLENBQVUsU0FBaUIsRUFBRSxRQUFnQztRQUN2RSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FHRDtBQU1ELGVBQWUsSUFBSSxVQUFVLEVBQUUsQ0FBQyJ9