import { requestAnimationFrame } from '../Common/Functions.js';
export class Interval {
    static add(optionsOrFunc, fps = 16, name = '') {
        let func, executions = 0, lastTick = 0, stopAfter = 0;
        name || (name = Math.random().toString(32).substr(2, 6));
        if (optionsOrFunc.hasOwnProperty('callback')) {
            fps = optionsOrFunc.fps || fps;
            func = optionsOrFunc.callback;
            name = optionsOrFunc.name || name;
            stopAfter = optionsOrFunc.stopAfter || 0;
        }
        else {
            func = optionsOrFunc;
        }
        if (!this.instance) {
            Interval.start();
        }
        this.instance.intervals.push({
            executions,
            fps,
            func,
            lastTick,
            name,
            stopAfter,
        });
        return name;
    }
    static fps(name, fps, func) {
        this.instance.intervals.filter((interval) => {
            if (interval.name === name) {
                interval.fps = fps || interval.fps;
                interval.func = func || interval.func;
            }
        });
        return this.instance;
    }
    static list() {
        console.log(this.instance.intervals);
    }
    static remove(name) {
        this.instance.intervals = this.instance.intervals.filter((interval) => interval.name != name);
    }
    static start() {
        if (!this.instance) {
            this.instance = new Interval();
        }
        this.instance.unpause();
    }
    static stop() {
        if (!this.instance) {
            return;
        }
        this.instance.pause();
    }
    constructor() {
        this.enabled = false;
        this.intervals = [];
        this.lastFrameTime = 0;
        this.Handle_OnRequestAnimationFrame = this.Handle_OnRequestAnimationFrame.bind(this);
    }
    pause() {
        this.enabled = false;
    }
    unpause() {
        this.enabled = true;
        this.Handle_OnRequestAnimationFrame();
    }
    async Handle_OnRequestAnimationFrame() {
        if (!this.enabled) {
            return;
        }
        const now = Date.now();
        this.intervals.forEach((interval) => {
            const diff = now - (interval.lastTick || 0);
            if (diff > interval.fps) {
                if (interval.stopAfter && interval.executions >= interval.stopAfter) {
                    Interval.remove(interval.name);
                    return;
                }
                interval.func({});
                interval.lastTick = now;
                interval.executions++;
            }
        });
        this.lastFrameTime = Date.now();
        requestAnimationFrame(this.Handle_OnRequestAnimationFrame);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJ2YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9JbnRlcnZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWlDL0QsTUFBTSxPQUFPLFFBQVE7SUFlYixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWtCLEVBQUUsTUFBYyxFQUFFLEVBQUUsT0FBd0IsRUFBRTtRQUNqRixJQUFJLElBQUksRUFDUCxVQUFVLEdBQUcsQ0FBQyxFQUNkLFFBQVEsR0FBRyxDQUFDLEVBQ1osU0FBUyxHQUFHLENBQUMsQ0FBQztRQUdmLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUd6RCxJQUFJLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUM5QyxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDL0IsSUFBSSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1lBQ2xDLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDO2FBQU0sQ0FBQztZQUNQLElBQUksR0FBRyxhQUFhLENBQUM7UUFDdEIsQ0FBQztRQUdELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFHRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDNUIsVUFBVTtZQUNWLEdBQUc7WUFDSCxJQUFJO1lBQ0osUUFBUTtZ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