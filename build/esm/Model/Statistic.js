import { Base } from './Base';
export class Statistic extends Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'statistics';
        this.fields = ['beacon_count', 'city_count', 'venue_count', 'user_count', 'video_duration_as_minutes', 'video_duration_as_hours'];
    }
    getBeaconCount() {
        return this.attr('beacon_count');
    }
    getCityCount() {
        return this.attr('city_count');
    }
    getVenueCount() {
        return this.attr('venue_count');
    }
    getUserCount() {
        return this.attr('user_count');
    }
    getVideoDurationAsMinutes() {
        return this.attr('video_duration_as_minutes');
    }
    getVideoDurationAsHours() {
        return this.attr('video_duration_as_hours');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGlzdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL01vZGVsL1N0YXRpc3RpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBTzlCLE1BQU0sT0FBTyxTQUFVLFNBQVEsSUFBSTtJQUFuQzs7UUFPUSxhQUFRLEdBQVcsWUFBWSxDQUFDO1FBT2hDLFdBQU0sR0FBYSxDQUFDLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSwyQkFBMkIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0lBZ0QvSSxDQUFDO0lBeENPLGNBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBVyxDQUFDO0lBQzVDLENBQUM7SUFLTSxZQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQVcsQ0FBQztJQUMxQyxDQUFDO0lBS00sYUFBYTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFXLENBQUM7SUFDM0MsQ0FBQztJQUtNLFlBQVk7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBVyxDQUFDO0lBQzFDLENBQUM7SUFLTSx5QkFBeUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFXLENBQUM7SUFDekQsQ0FBQztJQUtNLHVCQUF1QjtRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQVcsQ0FBQztJQUN2RCxDQUFDO0NBR0QifQ==