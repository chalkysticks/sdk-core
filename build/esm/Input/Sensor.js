import { Event } from '../index.js';
export class Sensor extends Event.Dispatcher {
    static start() {
        if (!this.instance) {
            this.instance = new Sensor();
        }
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0lucHV0L1NlbnNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBMkRwQyxNQUFNLE9BQU8sTUFBTyxTQUFRLEtBQUssQ0FBQyxVQUFVO0lBU3BDLE1BQU0sQ0FBQyxLQUFLO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDRixDQUFDO0lBS0QsSUFBVyxTQUFTO1FBQ25CLE9BQU8sZ0JBQWdCLElBQUksTUFBTSxDQUFDO0lBQ25DLENBQUM7SUFLRCxJQUFXLGNBQWM7UUFDeEIsT0FBTyxxQkFBcUIsSUFBSSxNQUFNLENBQUM7SUFDeEMsQ0FBQztJQUtELElBQVcsVUFBVTtRQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM5QyxDQUFDO0lBS0Q7UUFDQyxLQUFLLEVBQUUsQ0FBQztRQUdSLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRzdFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBS00sWUFBWTtRQUNsQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBS00sWUFBWTtRQUNsQixNQUFNLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBU1MsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQXlCO1FBQzlELE1BQU0sRUFBRSxZQUFZLEVBQUUsNEJBQTRCLEVBQUUsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBTVMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQThCO1FBQ3hFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDNUIsUUFBUTtZQUNSLEtBQUs7WUFDTCxJQUFJO1lBQ0osS0FBSztTQUNMLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FHRCJ9