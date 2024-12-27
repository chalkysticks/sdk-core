import { Base } from './Base.js';
export declare class Statistic extends Base {
    endpoint: string;
    fields: string[];
    getBeaconCount(): number;
    getCityCount(): number;
    getVenueCount(): number;
    getUserCount(): number;
    getVideoDurationAsMinutes(): number;
    getVideoDurationAsHours(): number;
}
