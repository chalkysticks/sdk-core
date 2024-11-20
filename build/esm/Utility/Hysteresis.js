import { Event } from '../index.js';
import { Interval } from './Interval.js';
export class Hysteresis extends Event.Dispatcher {
    static add(options) {
        const instance = new Hysteresis(options.condition, options.threshold || 1, options.duration || 25);
        instance.start();
        return instance;
    }
    static wait(options) {
        const instance = new Hysteresis(options.condition, options.threshold || 1, options.duration || 25);
        instance.start();
        return new Promise((resolve) => {
            instance.once('change', (data) => {
                instance.stop();
                resolve(data);
            });
        });
    }
    constructor(condition, threshold = 20, duration = 2000) {
        super();
        this.conditionMetCount = 0;
        this.isVariableSet = false;
        this.intervalName = '';
        this.condition = condition;
        this.threshold = threshold;
        this.duration = duration;
    }
    reset() {
        this.conditionMetCount = 0;
    }
    start() {
        this.intervalName = Interval.add(() => this.checkCondition(), this.duration / this.threshold);
    }
    stop() {
        Interval.remove(this.intervalName);
    }
    checkCondition() {
        const conditionMet = this.condition();
        if (conditionMet) {
            this.conditionMetCount = Math.min(this.threshold, this.conditionMetCount + 1);
            if (this.conditionMetCount >= this.threshold && !this.isVariableSet) {
                this.isVariableSet = true;
                this.dispatch('set');
                this.dispatch('change', {
                    set: this.isVariableSet,
                });
            }
        }
        else {
            this.conditionMetCount = Math.max(0, this.conditionMetCount - 1);
            if (this.conditionMetCount <= 0 && this.isVariableSet) {
                this.isVariableSet = false;
                this.dispatch('unset');
                this.dispatch('change', {
                    set: this.isVariableSet,
                });
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHlzdGVyZXNpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9VdGlsaXR5L0h5c3RlcmVzaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0N6QyxNQUFNLE9BQU8sVUFBVyxTQUFRLEtBQUssQ0FBQyxVQUFVO0lBS3hDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBMkI7UUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ25HLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQixPQUFPLFFBQVEsQ0FBQztJQUNqQixDQUFDO0lBTU0sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUEyQjtRQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWpCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNoQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBdUNELFlBQVksU0FBd0IsRUFBRSxZQUFvQixFQUFFLEVBQUUsV0FBbUIsSUFBSTtRQUNwRixLQUFLLEVBQUUsQ0FBQztRQXpCRCxzQkFBaUIsR0FBVyxDQUFDLENBQUM7UUFLOUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFVL0IsaUJBQVksR0FBb0IsRUFBRSxDQUFDO1FBWTFDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzFCLENBQUM7SUFLTSxLQUFLO1FBQ1gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBS00sS0FBSztRQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUtNLElBQUk7UUFDVixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBS1MsY0FBYztRQUN2QixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFdEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUU5RSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQ3ZCLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUM7YUFBTSxDQUFDO1lBQ1AsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUVqRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQ3ZCLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYTtpQkFDdkIsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUM7SUFDRixDQUFDO0NBQ0QifQ==