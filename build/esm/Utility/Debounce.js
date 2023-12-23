export class Debounce {
    static exec(reference, callable, timeout = 1000, inclusive = false, args = []) {
        if (!this.instances[reference]) {
            const instance = new Debounce(callable, timeout, inclusive);
            this.instances[reference] = instance.run;
        }
        this.instances[reference](...args);
    }
    constructor(callback, threshold = 200, inclusive = false) {
        this.lastTrigger = 0;
        this.timeout = 0;
        this.callback = callback;
        this.threshold = threshold;
        if (!inclusive) {
            this.lastTrigger = Date.now();
        }
        this.run = this.run.bind(this);
    }
    run() {
        const now = Date.now();
        const diff = now - this.lastTrigger;
        if (diff > this.threshold) {
            this.lastTrigger = now;
            this.callback();
        }
        if (this.timeout !== 0) {
            clearTimeout(this.timeout);
            this.timeout = 0;
        }
        this.timeout = setTimeout(this.callback, this.threshold);
    }
}
Debounce.instances = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9EZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQkEsTUFBTSxPQUFPLFFBQVE7SUFNVixNQUFNLENBQUMsSUFBSSxDQUNkLFNBQTBCLEVBQzFCLFFBQW9CLEVBQ3BCLFVBQWtCLElBQUksRUFDdEIsWUFBcUIsS0FBSyxFQUMxQixPQUFjLEVBQUU7UUFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUM3QyxDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUEyQ0QsWUFBbUIsUUFBb0IsRUFBRSxZQUFvQixHQUFHLEVBQUUsWUFBcUIsS0FBSztRQWZwRixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQU94QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBU3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBSTNCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFHRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFPTSxHQUFHO1FBQ04sTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLE1BQU0sSUFBSSxHQUFXLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRzVDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUdELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNyQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFJRCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDOztBQTFFYyxrQkFBUyxHQUFRLEVBQUUsQUFBVixDQUFXIn0=