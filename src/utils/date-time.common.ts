import moment from "moment";

const daysCountInYear = 365;
const maxDaysCount = 999;
const noMonthValue = "99";
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;

export const getToday = () => {
    return today;
}

export const getNoMonthValue = () => {
    return noMonthValue;
}

export const getCurrentYear = () => {
    return currentYear;
}

export const getCurrentMonth = () => {
    return currentMonth;
}

export const getDaysCountInYear = () => {
    return daysCountInYear;
}

export const getMaxDaysCount = (): number => {
    return maxDaysCount;
}

export const getTimeZoneOffset = (): number => {
    return moment().utcOffset();
}

export const getDiffOfTimeZonesInMinutes = (zoneOffsetInSeconds: number): number => {
    const offSetInMinutes = zoneOffsetInSeconds / 60;
    const currentOffset = getTimeZoneOffset();
    return offSetInMinutes - currentOffset;
}

export const getMonthValue = (month: string): number|undefined => {
    const noValue = month === getNoMonthValue();

    if (noValue) {
        return undefined;
    }
    if (Number(month) < 1 || Number(month) > 12) {
        throw new Error(`Month value: ${month} not supported`);
    }
    return Number(month);
}

export const getMonthNumber = (date: Date) => {
    return moment(date).month() + 1;
}

export const getYearValue = (year: string): number => {
    if (year.length !== 4) {
        throw new Error(`Year value: ${year} not supported`);
    }
    return Number(year);
}

export const rangeIsBiggerThanYear = (from: Date, to: Date) => {
    return getDiffOfDatesInDays(from, to) > daysCountInYear - 1;
}

export const rangeIsOver = (from: Date, to: Date) => {
    return getDiffOfDatesInDays(from, to) > getMaxDaysCount();
}

export const getDiffOfDatesInDays = (from: Date, to: Date): number => {
    return Math.floor(
        (Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
            Date.UTC(from.getFullYear(), from.getMonth(), from.getDate()) ) /(1000 * 60 * 60 * 24));
}

export const equalDatesWithoutTime = (date1: Date, date2: Date) => {
    return removeTimeFromDate(date1).getTime() === removeTimeFromDate(date2).getTime();
}

export const removeTimeFromDate = (date: Date) => {
    const dateClone = new Date(date.getTime());
    dateClone.setHours(0,0,0,0);
    return dateClone;
}

export const getMinDate = (dates: (Date|null)[]) => {
    return new Date(Math.min(...dates.map((d: Date|null) => {
        return d ? d.getTime() : Infinity;
    })));
}

export const getMaxDate = (dates: (Date|null)[]) => {
    return new Date(Math.max(...dates.map((d: Date|null) => {
        return d ? d.getTime() : 0;
    })));
}

export const addDays = (date: Date, count: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + count);
    return newDate;
}

export const minusDays = (date: Date, count: number): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - count);
    return newDate;
}

export const addMinutes = (date: Date, minutes: number): Date => {
    return moment(date).add(minutes, 'minutes').toDate();
}
export const addHours = (date: Date, hours: number): Date => {
    return moment().add(hours, 'hours').toDate();
}