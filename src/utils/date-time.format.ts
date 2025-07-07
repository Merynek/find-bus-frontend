
export interface IFormatSettings {
    locale: string;
    date: Date;
}

export const getMonths = (locale: string) => {
    const format = new Intl.DateTimeFormat(locale, { month: "long" })
    const months = []
    for (let month = 0; month < 12; month++) {
        const date = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
        months.push(format.format(date))
    }
    return months;
}

export const getWeekDays = (locale: string): string[] => {
    const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const days: string[] = [];
    for (let i = 3; i <= 9; i++) {
        const day = new Date(Date.UTC(2022, 0, i));
        days.push(format.format(day));
    }
    return days;
}

export const formatD = (settings: IFormatSettings) => {
    return format(settings, {
        day: "2-digit"
    });
}

export const formatDNumeric = (settings: IFormatSettings) => {
    return format(settings, {
        day: "numeric"
    });
}

export const formatM = (settings: IFormatSettings) => {
    return format(settings, {
        month: "2-digit",
    });
}

export const formatMLong = (settings: IFormatSettings) => {
    return format(settings, {
        month: "long",
    });
}

export const formatMShort = (settings: IFormatSettings) => {
    return format(settings, {
        month: "short",
    });
}

export const formatY = (settings: IFormatSettings) => {
    return format(settings, {
        year: "numeric"
    });
}

export const formatW = (settings: IFormatSettings) => {
    return format(settings, {
        weekday: "short",
    });
}

export const formatDM = (settings: IFormatSettings) => {
    return format(settings, {
        day: "2-digit",
        month: "2-digit"
    });
}

export const formatMYLong = (settings: IFormatSettings) => {
    return format(settings, {
        year: "numeric",
        month: "long",
    });
}

export const formatMYShort = (settings: IFormatSettings) => {
    return format(settings, {
        year: "numeric",
        month: "short",
    });
}

export const formatDMY = (settings: IFormatSettings) => {
    return format(settings, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}

export const formatDateTime = (settings: IFormatSettings) => {
    return format(settings, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}

export const formatTime = (settings: IFormatSettings) => {
    return format(settings, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

export const formatTimeWithoutSeconds = (settings: IFormatSettings) => {
    return format(settings, {
        hour: "2-digit",
        minute: "2-digit"
    });
}

const format = (settings: IFormatSettings, options: Intl.DateTimeFormatOptions): string => {
    const {date, locale} = settings;
    return new Intl.DateTimeFormat(locale, options).format(date);
}

export const capitalize = (text: string) => {
    if (text.length) {
        return text[0].toUpperCase() + text.slice(1);
    }
    throw new Error("Cant capitalize empty string");
}