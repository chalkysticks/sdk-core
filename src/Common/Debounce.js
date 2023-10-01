"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Debounce {
    static exec(reference, callable, args = [], timeout = 1000) {
        if (!this.instances[reference]) {
            const instance = new Debounce(callable, timeout);
            this.instances[reference] = instance.run;
        }
        this.instances[reference](...args);
    }
    constructor(callback, threshold = 200) {
        this.lastTrigger = 0;
        this.timeout = 0;
        this.callback = callback;
        this.threshold = threshold;
        this.lastTrigger = Date.now();
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
        this.timeout = window.setTimeout(this.callback, this.threshold);
    }
}
exports.default = Debounce;
Debounce.instances = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBLE1BQXFCLFFBQVE7SUFNckIsTUFBTSxDQUFDLElBQUksQ0FDakIsU0FBMEIsRUFDMUIsUUFBb0IsRUFDcEIsT0FBYyxFQUFFLEVBQ2hCLFVBQWtCLElBQUk7UUFFdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBMENELFlBQW1CLFFBQW9CLEVBQUUsWUFBb0IsR0FBRztRQWR4RCxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQU94QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBUTNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBSTNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTlCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQU9NLEdBQUc7UUFDVCxNQUFNLEdBQUcsR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsTUFBTSxJQUFJLEdBQVcsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFHNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDaEI7UUFHRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDakI7UUFHRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7QUE5RkYsMkJBK0ZDO0FBdEVlLGtCQUFTLEdBQVEsRUFBRSxDQUFDIn0=