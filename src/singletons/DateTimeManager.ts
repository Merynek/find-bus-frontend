import {DateTimeFormat} from "../enums/date-time-format.enum";
import {
    capitalize,
    formatD, formatDateTime, formatDM, formatDMY,
    formatM,
    formatMLong,
    formatMShort, formatMYLong, formatMYShort, formatTime, formatTimeWithoutSeconds,
    formatW,
    formatY,
    IFormatSettings
} from "@/src/utils/date-time.format";
import {LOCALES} from "@/src/enums/locale";

export class DateTimeManager {
    public static dateTimeFormat(format: DateTimeFormat, date: Date, withDayName?: boolean): string {
        const locale = LOCALES.cs_CZ;
        let formattedDate = "";
        const settings: IFormatSettings = {
            locale: locale,
            date: date
        }

        switch (format) {
            case DateTimeFormat.FORMAT_D:
                formattedDate = formatD(settings);
                break;
            case DateTimeFormat.FORMAT_M:
                formattedDate = formatM(settings);
                break;
            case DateTimeFormat.FORMAT_M_LONG:
                formattedDate = formatMLong(settings);
                break;
            case DateTimeFormat.FORMAT_M_SHORT:
                formattedDate = formatMShort(settings);
                break;
            case DateTimeFormat.FORMAT_Y:
                formattedDate = formatY(settings);
                break;
            case DateTimeFormat.FORMAT_W:
                formattedDate = formatW(settings);
                break;
            case DateTimeFormat.FORMAT_DM:
                formattedDate = formatDM(settings);
                break;
            case DateTimeFormat.FORMAT_MY_LONG:
                formattedDate = formatMYLong(settings);
                break;
            case DateTimeFormat.FORMAT_MY_SHORT:
                formattedDate = formatMYShort(settings);
                break;
            case DateTimeFormat.FORMAT_WDM:
                return `${capitalize(formatW({locale: locale, date: date}))}, ${this.dateTimeFormat(DateTimeFormat.FORMAT_DM, date)}`;
            case DateTimeFormat.FORMAT_WDMY:
                return `${capitalize(formatW({locale: locale, date: date}))}, ${this.dateTimeFormat(DateTimeFormat.FORMAT_DMY, date)}`;
            case DateTimeFormat.FORMAT_DMY:
                formattedDate = formatDMY(settings);
                break;
            case DateTimeFormat.FORMAT_DATE_TIME:
                formattedDate = formatDateTime(settings);
                break;
            case DateTimeFormat.FORMAT_TIME:
                formattedDate = formatTime(settings);
                break;
            case DateTimeFormat.FORMAT_TIME_WITHOUT_SECONDS:
                formattedDate = formatTimeWithoutSeconds(settings);
                break;
        }
        if (withDayName) {
            return `${formattedDate} (${this.dateTimeFormat(DateTimeFormat.FORMAT_W, date)})`;
        }
        return formattedDate;
    }
}