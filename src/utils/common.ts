export const MOBILE_MAX_WIDTH = 768;
export const DESKTOP_MIN_WIDTH = 1024;
export const INT_32_MAX_VALUE = 2147483646;

export const setWindowScrolling = (enable: boolean) => {
    document.documentElement.style.overflowY = enable ? "auto" : "hidden";
    document.body.style.overflowY = enable ? "auto" : "hidden";
}

export const resetPage = () => {
    window.location.reload();
}

export function getRandomNumber(min: number, max: number) {
    if (max > INT_32_MAX_VALUE) {
        max = INT_32_MAX_VALUE;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function debouncedFn<T>(fn: () => Promise<T>|T, delay: number): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        setTimeout(async () => {
            resolve(await fn());
        }, delay);
    })
}

export function cn(...classes: any[]): string {
    const strings: string[] = classes.filter(item => typeof item === "string");

    return strings.join(" ");
}

export function removeOnIndex<T>(array: T[], index: number): void {
    if (index > -1) {
        array.splice(index, 1);
    }
}

export function isEmail(value: string): boolean {
    return (/^([-.a-zA-Z0-9!#$%&'*+/=?^_`{|}~]*)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/).test(value);
}

export function formatTimeForTrip(seconds: number|undefined, hourTranslation: string, minuteTranslation: string) {
    if (seconds === undefined) {
        return "?"
    }
    let minutes = Math.round(seconds / 60);
    let hours = 0;
    let displayMinutes

    while (minutes > 59) {
        hours++;
        minutes -= 60;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes;
    } else {
        displayMinutes = minutes;
    }

    if (hours > 0) {
        return [hours, hourTranslation, displayMinutes, minuteTranslation].join(" ");
    } else {
        return [displayMinutes, minuteTranslation].join(" ");
    }
}

export enum DistanceUnit {
    METER,
    KILOMETER,
    MILE
}

interface IDistanceFormat {
    distance: number;
    unit: DistanceUnit;
}

export function formatDistance(meters: number): IDistanceFormat {
    if (meters > 9999) {
        return {
            distance: Math.round(meters/1000),
            unit: DistanceUnit.KILOMETER
        }
    } else if (meters > 999) {
        return {
            distance: Math.round(meters/1000 * 100) / 100,
            unit: DistanceUnit.KILOMETER
        }
    }
    return {
        distance: Math.round(meters),
        unit: DistanceUnit.METER
    }
}

export function getFormattedDistance(val: number): string {
    const format = formatDistance(val);
    switch (format.unit) {
        case DistanceUnit.METER:
            return format.distance + " m";
        case DistanceUnit.KILOMETER:
            return format.distance + " km";
        default:
            throw new Error(`Unknown unit format - ${format.unit}`);
    }
}

export function hoursToSeconds(hours: number): number {
    return hours * 60 * 60;
}
export function secondsToMilliSeconds(seconds: number): number {
    return seconds * 1000;
}
export function milliSecondsToSeconds(milliSeconds: number): number {
    return milliSeconds / 1000;
}
export function secondsToMinutes(seconds: number): number {
    return seconds / 60;
}
export function minutesToHours(minutes: number): number {
    return minutes / 60;
}
export function milliSecondsToHours(milliSeconds: number): number {
    return minutesToHours(secondsToMinutes(milliSecondsToSeconds(milliSeconds)));
}

