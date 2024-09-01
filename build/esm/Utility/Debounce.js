const debouncerInstances = {};
export class Debounce {
    static exec(reference, callable, timeout = 1000, inclusive = false, args = []) {
        if (!debouncerInstances[reference]) {
            const debouncer = new Debounce(callable, timeout, true, inclusive);
            debouncerInstances[reference] = debouncer.run;
        }
        debouncerInstances[reference](...args);
    }
    constructor(callback, threshold = 200, immediate = false, inclusive = false) {
        this.inclusive = false;
        this.lastTrigger = 0;
        this.timeout = 0;
        this.callback = callback;
        this.inclusive = inclusive;
        this.threshold = threshold;
        if (!inclusive) {
            this.lastTrigger = Date.now();
        }
        this.run = this.run.bind(this);
    }
    run(wasInclusive = false) {
        const now = Date.now();
        const diff = now - this.lastTrigger;
        if (diff > this.threshold) {
            this.lastTrigger = now;
            this.callback.apply(null, arguments);
        }
        if (this.timeout !== 0) {
            clearTimeout(this.timeout);
            this.timeout = 0;
        }
        if (this.inclusive && !wasInclusive) {
            this.timeout = setTimeout(() => this.run(true), this.threshold);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9EZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGtCQUFrQixHQUFRLEVBQUUsQ0FBQztBQTJCbkMsTUFBTSxPQUFPLFFBQVE7SUFNYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQTBCLEVBQUUsUUFBb0IsRUFBRSxVQUFrQixJQUFJLEVBQUUsWUFBcUIsS0FBSyxFQUFFLE9BQWMsRUFBRTtRQUN4SSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQy9DLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUE0Q0QsWUFBbUIsUUFBb0IsRUFBRSxZQUFvQixHQUFHLEVBQUUsWUFBcUIsS0FBSyxFQUFFLFlBQXFCLEtBQUs7UUF2QmhILGNBQVMsR0FBWSxLQUFLLENBQUM7UUFPM0IsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFPeEIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQVUzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUkzQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUdELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQVFNLEdBQUcsQ0FBQyxlQUF3QixLQUFLO1FBQ3ZDLE1BQU0sR0FBRyxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixNQUFNLElBQUksR0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUc1QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFHdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFPRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDeEIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBR0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNGLENBQUM7Q0FDRCJ9