import { Event } from '../index.js';
export class Video extends Event.Dispatcher {
    static async getSources() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter((device) => device.kind === 'videoinput');
        return videoInputs.map((device) => ({
            deviceId: device.deviceId,
            label: device.label,
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlkZW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvSW5wdXQvVmlkZW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWVwQyxNQUFNLE9BQU8sS0FBTSxTQUFRLEtBQUssQ0FBQyxVQUFVO0lBTW5DLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVTtRQUU3QixNQUFNLE9BQU8sR0FBRyxNQUFNLFNBQVMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUdoRSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDO1FBRzdFLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1NBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNEIn0=