import React from "react";
import {IInputBoxProps} from "../text-box/text-box";
import {INT_32_MAX_VALUE} from "@/src/utils/common";
import {InputWrapper} from "@/src/components/components/inputs/wrapper/input-wrapper";

interface IProps extends IInputBoxProps {
    minValue?: number;
    maxValue?: number;
    decimalCount?: number;
}

interface IControlledProps extends IProps {
    controlled: true;
    value?: number;
    onChange: (value: number|undefined) => void;
}

interface UncontrolledProps extends IProps {
    controlled: false;
    value?: never;
    onChange?: never;
    defaultValue?: number;
}

export type INumberBoxProps = IControlledProps | UncontrolledProps;

export const NumberBox = (props: INumberBoxProps) => {
    const { focusAfterMount, placeholder, onChange, onBlur, onFocus, value, disabled,
        maxValue, minValue, decimalCount, iconProps, controlled, autoComplete, name, id} = props;
    const max = Math.min(INT_32_MAX_VALUE, maxValue === undefined ? INT_32_MAX_VALUE : maxValue);
    const min = Math.max(-INT_32_MAX_VALUE, minValue === undefined ? -INT_32_MAX_VALUE : minValue);

    const valueIsTooBig = (val: number) => {
        return val > max;
    };
    const valueIsTooSmall = (val: number) => {
        return val < min;
    }

    const handleChange = (value: number|undefined) => {
        if (controlled) {
            if (value === undefined) {
                onChange(value);
                return;
            }
            if (valueIsTooSmall(value)) {
                onChange(min);
                return
            }
            if (valueIsTooBig(value)) {
                onChange(max);
                return
            }
            onChange(value)
        }
    }

    const renderValue = (): string => {
        return value !== undefined ? value.toString() : "";
    }

    const _renderInput = () => {
        const inputProps = {
            autoFocus: focusAfterMount,
            type: "number",
            placeholder: "",
            onBlur: onBlur,
            onFocus: onFocus,
            autoComplete: autoComplete,
            disabled: disabled,
            name: name,
            id: id,
            step: decimalCount ? Math.pow(0.1, decimalCount) : undefined,
            min: minValue,
            max: maxValue
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (controlled) {
                if (!event.target.value || isNaN(Number(event.target.value))) {
                    handleChange(undefined);
                    return;
                }
                handleChange(Number(event.target.value));
            }
        };

        if (controlled) {
            return <InputWrapper
                input={<input {...inputProps} value={renderValue()} onChange={handleInputChange} inputMode={"decimal"} />}
                placeholder={placeholder}
                iconProps={iconProps}
            />
        } else {
            return <InputWrapper
                input={<input {...inputProps} defaultValue={props.defaultValue} onChange={handleInputChange} inputMode={"decimal"} />}
                placeholder={placeholder}
                iconProps={iconProps}
            />
        }
    }

    return _renderInput();
};
