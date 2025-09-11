import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider} from "@mui/x-date-pickers";
import { DateTimePicker as NativeDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {DatePickerSlotProps, DatePicker as NativeDatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import {LOCALES} from "@/src/utils/locale";
import {PickerValue} from "@mui/x-date-pickers/internals";

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
}

interface IUncontrolledProps extends IBaseDatePickerProps {
    controlled: false;
    value?: never;
    onChange?: never;
    defaultValue?: Date|null;
}

export type IDatePickerProps = IControlledProps | IUncontrolledProps;

export const DatePicker = (props: IDatePickerProps) => {
    const {value, locale, minDate, disabled, maxDate, onChange, placeholderText, showTimeSelect, controlled, name, id} = props;

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

    const valueToUse = controlled ? value : (props.defaultValue ?? null);

    const pickerProps = {
        minDate: minDate ? moment(minDate) : undefined,
        maxDate: maxDate ? moment(maxDate) : undefined,
        value: valueToUse ? moment(valueToUse) : undefined,
        disabled: disabled,
        label: placeholderText,
        slotProps: slotProps,
        onChange: (date: PickerValue) => {
            if (controlled && onChange) {
                onChange(date ? date.toDate() : null)
            }
        },
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