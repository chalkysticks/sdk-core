import { Event } from '../index.js';
export class Sensor extends Event.Dispatcher {
    get hasMotion() {
        return 'ondevicemotion' in window;
    }
    get hasOrientation() {
        return 'ondeviceorientation' in window;
    }
    get hasSensors() {
        return this.hasOrientation && this.hasMotion;
    }
    constructor() {
        super();
        this.Handle_OnDeviceMotion = this.Handle_OnDeviceMotion.bind(this);
        this.Handle_OnDeviceOrientation = this.Handle_OnDeviceOrientation.bind(this);
        this.attachEvents();
    }
    attachEvents() {
        window.addEventListener('devicemotion', this.Handle_OnDeviceMotion);
        window.addEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
    }
    detachEvents() {
        window.removeEventListener('devicemotion', this.Handle_OnDeviceMotion);
        window.removeEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
    }
    async Handle_OnDeviceMotion(e) {
        const { acceleration, accelerationIncludingGravity, rotationRate } = e;
        this.dispatch('gyroscope', rotationRate);
        this.dispatch('accelerometer', acceleration);
        this.dispatch('accelerometer:gravity', accelerationIncludingGravity);
    }
    async Handle_OnDeviceOrientation(e) {
        const { absolute, alpha, beta, gamma } = e;
        this.dispatch('orientation', {
            absolute,
            alpha,
            beta,
            gamma,
        });
    }
}
export default new Sensor();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0lucHV0L1NlbnNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBMkRwQyxNQUFNLE9BQU8sTUFBTyxTQUFRLEtBQUssQ0FBQyxVQUFVO0lBSTNDLElBQVcsU0FBUztRQUNuQixPQUFPLGdCQUFnQixJQUFJLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBS0QsSUFBVyxjQUFjO1FBQ3hCLE9BQU8scUJBQXFCLElBQUksTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFLRCxJQUFXLFVBQVU7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUtEO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFHUixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUc3RSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUtNLFlBQVk7UUFDbEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUtNLFlBQVk7UUFDbEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7SUFDbEYsQ0FBQztJQVNTLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUF5QjtRQUM5RCxNQUFNLEVBQUUsWUFBWSxFQUFFLDRCQUE0QixFQUFFLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQU1TLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUE4QjtRQUN4RSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQzVCLFFBQVE7WUFDUixLQUFLO1lBQ0wsSUFBSTtZQUNKLEtBQUs7U0FDTCxDQUFDLENBQUM7SUFDSixDQUFDO0NBR0Q7QUFHRCxlQUFlLElBQUksTUFBTSxFQUFFLENBQUMifQ==