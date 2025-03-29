import { Event } from '../index.js';
export class Sensor extends Event.Dispatcher {
    constructor() {
        super();
        this._globalContext = typeof window !== 'undefined' ? window : undefined;
        this.Handle_OnDeviceMotion = this.Handle_OnDeviceMotion.bind(this);
        this.Handle_OnDeviceOrientation = this.Handle_OnDeviceOrientation.bind(this);
        this.attachEvents();
    }
    get hasMotion() {
        return !!this._globalContext && 'ondevicemotion' in this._globalContext;
    }
    get hasOrientation() {
        return !!this._globalContext && 'ondeviceorientation' in this._globalContext;
    }
    get hasSensors() {
        return this.hasOrientation && this.hasMotion;
    }
    attachEvents() {
        if (!this._globalContext) {
            return;
        }
        if (this.hasMotion) {
            this._globalContext.addEventListener('devicemotion', this.Handle_OnDeviceMotion);
        }
        if (this.hasOrientation) {
            this._globalContext.addEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
        }
    }
    detachEvents() {
        if (!this._globalContext) {
            return;
        }
        try {
            this._globalContext.removeEventListener('devicemotion', this.Handle_OnDeviceMotion);
            this._globalContext.removeEventListener('deviceorientation', this.Handle_OnDeviceOrientation);
        }
        catch (e) {
            console.error('Sensor: Error removing event listeners.', e);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2Vuc29yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0lucHV0L1NlbnNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBa0VwQyxNQUFNLE9BQU8sTUFBTyxTQUFRLEtBQUssQ0FBQyxVQUFVO0lBUzNDO1FBQ0MsS0FBSyxFQUFFLENBQUM7UUFHUixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFHekUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHN0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFNRCxJQUFXLFNBQVM7UUFFbkIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ3pFLENBQUM7SUFNRCxJQUFXLGNBQWM7UUFFeEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxxQkFBcUIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzlFLENBQUM7SUFNRCxJQUFXLFVBQVU7UUFFcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQU9NLFlBQVk7UUFFbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUUxQixPQUFPO1FBQ1IsQ0FBQztRQUdELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzVGLENBQUM7SUFDRixDQUFDO0lBTU0sWUFBWTtRQUVsQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFCLE9BQU87UUFDUixDQUFDO1FBS0QsSUFBSSxDQUFDO1lBQ0osSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUMvRixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUVaLE9BQU8sQ0FBQyxLQUFLLENBQUMseUNBQXlDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztJQUNGLENBQUM7SUFTUyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBeUI7UUFDOUQsTUFBTSxFQUFFLFlBQVksRUFBRSw0QkFBNEIsRUFBRSxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFNUyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBOEI7UUFDeEUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUM1QixRQUFRO1lBQ1IsS0FBSztZQUNMLElBQUk7WUFDSixLQUFLO1NBQ0wsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUdEO0FBSUQsZUFBZSxJQUFJLE1BQU0sRUFBRSxDQUFDIn0=