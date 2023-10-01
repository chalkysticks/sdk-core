"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventDispatcher {
    constructor() {
        this.events = {};
        this.useWindow = true;
    }
    static get global() {
        return this.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventDispatcher();
        }
        return this.instance;
    }
    get shouldUseWindow() {
        return this.useWindow && typeof window !== 'undefined';
    }
    on(event, listener) {
        if (this.shouldUseWindow) {
            window.addEventListener(event, listener);
        }
        else {
            this.events[event] = this.events[event] || [];
            this.events[event].push(listener);
        }
        return this;
    }
    off(event, listener) {
        if (this.shouldUseWindow) {
            window.removeEventListener(event, listener);
        }
        else {
            this.events[event] = this.events[event] || [];
            if (!listener) {
                this.events[event] = [];
            }
            else {
                this.events[event] = this.events[event].filter((handler) => handler != listener);
            }
        }
        return this;
    }
    dispatch(event, detail = {}) {
        if (this.shouldUseWindow) {
            window === null || window === void 0 ? void 0 : window.dispatchEvent(new CustomEvent(event, { detail }));
        }
        else if (this.events[event]) {
            this.events[event].forEach((listener) => listener(detail));
        }
        return this;
    }
    deferDispatch(event, detail = {}, amount = 1) {
        setTimeout(() => this.dispatch(event, detail), amount);
        return this;
    }
}
exports.default = EventDispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnREaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnREaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsTUFBcUIsZUFBZTtJQUFwQztRQW9DUyxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBS2pCLGNBQVMsR0FBWSxJQUFJLENBQUM7SUErRW5DLENBQUM7SUFwSE8sTUFBTSxLQUFLLE1BQU07UUFDdkIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQVVNLE1BQU0sQ0FBQyxXQUFXO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztTQUN0QztRQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN0QixDQUFDO0lBS0QsSUFBWSxlQUFlO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7SUFDeEQsQ0FBQztJQXFCTSxFQUFFLENBQUMsS0FBYSxFQUFFLFFBQWE7UUFDckMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDekM7YUFDSTtZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFTTSxHQUFHLENBQUMsS0FBYSxFQUFFLFFBQWE7UUFDdEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDNUM7YUFDSTtZQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFOUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUN4QjtpQkFDSTtnQkFDSixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUM7YUFDdEY7U0FDRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQVNNLFFBQVEsQ0FBQyxLQUFhLEVBQUUsU0FBYyxFQUFFO1FBRTlDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxRDthQUdJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDaEU7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFTTSxhQUFhLENBQUMsS0FBYSxFQUFFLFNBQWMsRUFBRSxFQUFFLFNBQWlCLENBQUM7UUFDdkUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztDQUNEO0FBeEhELGtDQXdIQyJ9