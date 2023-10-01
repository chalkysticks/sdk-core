export default class EventDispatcher {
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
            window?.dispatchEvent(new CustomEvent(event, { detail }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnREaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0NvbW1vbi9FdmVudERpc3BhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFlO0lBQXBDO1FBb0NTLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFLakIsY0FBUyxHQUFZLElBQUksQ0FBQztJQStFbkMsQ0FBQztJQXBITyxNQUFNLEtBQUssTUFBTTtRQUN2QixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBVU0sTUFBTSxDQUFDLFdBQVc7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFLRCxJQUFZLGVBQWU7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztJQUN4RCxDQUFDO0lBcUJNLEVBQUUsQ0FBQyxLQUFhLEVBQUUsUUFBYTtRQUNyQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN6QzthQUNJO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQVNNLEdBQUcsQ0FBQyxLQUFhLEVBQUUsUUFBYTtRQUN0QyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM1QzthQUNJO1lBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUU5QyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hCO2lCQUNJO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsQ0FBQzthQUN0RjtTQUNEO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBU00sUUFBUSxDQUFDLEtBQWEsRUFBRSxTQUFjLEVBQUU7UUFFOUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLE1BQU0sRUFBRSxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFEO2FBR0ksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNoRTtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQVNNLGFBQWEsQ0FBQyxLQUFhLEVBQUUsU0FBYyxFQUFFLEVBQUUsU0FBaUIsQ0FBQztRQUN2RSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0QifQ==