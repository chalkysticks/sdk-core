type TimeInput = Date | string | number;
export declare function bytesToSize(bytes: number): string;
export declare function daysBetweenDates(date1: Date, date2: Date): number;
export declare function secondsToTime(seconds: number, format?: string): string;
export declare function timeToSeconds(time: string): number;
export declare function timeToHuman(time: TimeInput, hideEmptyUnits?: boolean): string;
export declare function getRelativeTime(date: TimeInput, options?: {
    type?: 'ago' | 'until';
    suffix?: string;
    shortUnits?: boolean;
}): string;
export declare function timeAgo(date: TimeInput, type?: string, suffix?: string): string;
export declare function timeUntil(date: TimeInput, type?: string, suffix?: string): string;
export {};
