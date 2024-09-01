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
        if (!singleton) {
            Interval.start();
        }
        singleton.intervals.push({
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
        singleton.intervals.filter((interval) => {
            if (interval.name === name) {
                interval.fps = fps || interval.fps;
                interval.func = func || interval.func;
            }
        });
        return singleton;
    }
    static list() {
        console.log(singleton.intervals);
    }
    static remove(name) {
        singleton.intervals = singleton.intervals.filter((interval) => interval.name != name);
    }
    static start() {
        singleton && singleton.unpause();
    }
    static stop() {
        if (!singleton) {
            return;
        }
        singleton.pause();
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
const singleton = new Interval();
export default singleton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJ2YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvVXRpbGl0eS9JbnRlcnZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQWlDL0QsTUFBTSxPQUFPLFFBQVE7SUFVYixNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWtCLEVBQUUsTUFBYyxFQUFFLEVBQUUsT0FBd0IsRUFBRTtRQUNqRixJQUFJLElBQUksRUFDUCxVQUFVLEdBQUcsQ0FBQyxFQUNkLFFBQVEsR0FBRyxDQUFDLEVBQ1osU0FBUyxHQUFHLENBQUMsQ0FBQztRQUdmLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUd6RCxJQUFJLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUM5QyxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDL0IsSUFBSSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO1lBQ2xDLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDO2FBQU0sQ0FBQztZQUNQLElBQUksR0FBRyxhQUFhLENBQUM7UUFDdEIsQ0FBQztRQUdELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUdELFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3hCLFVBQVU7WUFDVixHQUFHO1lBQ0gsSUFBSTtZQUNKLFFBQVE7WUFDUixJQUFJO1lBQ0osU0FBUztT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