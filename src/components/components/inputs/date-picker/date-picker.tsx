import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider} from "@mui/x-date-pickers";
import { DateTimePicker as NativeDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {DatePickerSlotProps, DatePicker as NativeDatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import {LOCALES} from "@/src/enums/locale";
import {PickerValue} from "@mui/x-date-pickers/internals";
import {useCallback, useState} from "react";

interface IBaseDatePickerProps {
    minDate?: Date | null;
    maxDate?: Date | null;
    placeholderText: string;
    disabled?: boolean;
    showTimeSelect?: boolean;
    locale: LOCALES;
    id?: string;
    name?: string;
}

interface IControlledProps extends IBaseDatePickerProps {
    controlled: true;
    value?: Date | null;
    onChange: (date: Date|null) => void;
    defaultValue?: never;
}

interface IUncontrolledProps extends IBaseDatePickerProps {
    controlled: false;
    value?: never;
    onChange?: never;
    defaultValue?: Date|null;
}

export type IDatePickerProps = IControlledProps | IUncontrolledProps;

export const DatePicker = (props: IDatePickerProps) => {
    const {value, locale, minDate, disabled, maxDate, onChange, placeholderText, showTimeSelect, controlled, name, id, defaultValue} = props;
    const [internalValue, setInternalValue] = useState<Date|null>(null);

    const slotProps: DatePickerSlotProps<true> = {
        textField: {
            sx: {
                width: "100%",
                "label": {
                    top: "-9px",
                    left: "-14px",
                    color: "#888a8f"
                },
                ".Mui-focused": {
                    color: "#000000!important"
                },
                ".MuiInputLabel-shrink": {
                    color: "#888a8f"
                },
                ".MuiPickersInputBase-root": {
                    borderBottom: "2px solid #ffea00",
                    borderRadius: "0",
                    padding: "0"
                },
                ".MuiPickersSectionList-root": {
                    padding: "0!important"
                },
                "fieldset": {
                    border: "none!important"
                }
            }
        }
    }

    const handleChange = useCallback((newValue: PickerValue) => {
        if (controlled) {
            onChange(newValue ? newValue.toDate() : null);
        }
        setInternalValue(newValue ? newValue.toDate() : null);
    }, [controlled, onChange]);

    const selectedValue = value !== undefined ? value : internalValue || defaultValue;

    const pickerProps = {
        minDate: minDate ? moment(minDate) : undefined,
        maxDate: maxDate ? moment(maxDate) : undefined,
        disabled: disabled,
        label: placeholderText,
        slotProps: slotProps,
        value: selectedValue ? moment(selectedValue) : undefined,
        onChange: handleChange,
        id: id,
        name: name
    }

    return <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        {showTimeSelect ? <NativeDateTimePicker
            {...pickerProps}
        /> : <NativeDatePicker
            {...pickerProps}
        />}
    </LocalizationProvider>;
};