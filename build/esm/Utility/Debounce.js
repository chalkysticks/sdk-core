export class Debounce {
    static exec(reference, callable, timeout = 1000, inclusive = false, args = []) {
        if (!this.instances[reference]) {
            const instance = new Debounce(callable, timeout, inclusive);
            this.instances[reference] = instance.run;
        }
        this.instances[reference](...args);
    }
    static { this.instances = {}; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9EZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQkEsTUFBTSxPQUFPLFFBQVE7SUFNYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQTBCLEVBQUUsUUFBb0IsRUFBRSxVQUFrQixJQUFJLEVBQUUsWUFBcUIsS0FBSyxFQUFFLE9BQWMsRUFBRTtRQUN4SSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQzFDLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzthQU9jLGNBQVMsR0FBUSxFQUFFLEFBQVYsQ0FBVztJQW9DbkMsWUFBbUIsUUFBb0IsRUFBRSxZQUFvQixHQUFHLEVBQUUsWUFBcUIsS0FBSztRQWZwRixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQU94QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBUzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBSTNCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixDQUFDO1FBR0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBT00sR0FBRztRQUNULE1BQU0sR0FBRyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixNQUFNLElBQUksR0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUc1QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFHRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDeEIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBSUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQyJ9