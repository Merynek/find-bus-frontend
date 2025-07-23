import React from "react";
import {observer} from "mobx-react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker as NativeDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker as NativeDatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import {LOCALES} from "@/src/utils/locale";

export interface IDatePickerProps {
    selected?: Date | null;
    minDate?: Date | null;
    maxDate?: Date | null;
    placeholderText: string;
    disabled?: boolean;
    onChange: (date: Date|null) => void,
    showTimeSelect?: boolean;
    locale: LOCALES;
}

export const DatePicker = observer((props: IDatePickerProps) => {
    const {selected, locale,
        minDate, disabled, maxDate, onChange,
        showTimeSelect} = props;

    return <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        {showTimeSelect ? <NativeDateTimePicker
            value={selected ? moment(selected) : undefined}
            minDate={minDate ? moment(minDate) : undefined}
            maxDate={maxDate ? moment(maxDate) : undefined}
            onChange={(date) => {
                date && onChange(date.toDate())
            }}
            disabled={disabled}
        /> : <NativeDatePicker
            value={selected ? moment(selected) : undefined}
            minDate={minDate ? moment(minDate) : undefined}
            maxDate={maxDate ? moment(maxDate) : undefined}
            onChange={(date) => {
                date && onChange(date.toDate())
            }}
            disabled={disabled}
        />}
    </LocalizationProvider>;
});