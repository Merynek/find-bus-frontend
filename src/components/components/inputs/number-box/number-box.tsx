import React, {useState} from "react";
import styles from "../text-box/text-box.module.scss"
import { IInputBoxProps } from "../text-box/text-box";
import {cn, INT_32_MAX_VALUE} from "@/src/utils/common";
import {observer} from "mobx-react";

export interface INumberBoxProps extends IInputBoxProps {
    value?: number;
    onChange: (value: number | undefined) => void;
    hideSpinButtons?: boolean;
    minValue?: number;
    maxValue?: number;
    decimalCount?: number;
}

enum InputType {
    TEXT = "text",
    NUMBER = "number"
}

export const NumberBox = observer((props: INumberBoxProps) => {
    const { refInput, focusAfterMount, placeholder,
        hideSpinButtons, onChange, onKeyEnter,
        onBlur, onFocus, value, disabled,
        inputAutoSize, maxValue, minValue, decimalCount
    } = props;
    const [inputType, setInputType] = useState(focusAfterMount ? InputType.NUMBER : InputType.TEXT);
    const max = Math.min(INT_32_MAX_VALUE, maxValue === undefined ? INT_32_MAX_VALUE : maxValue);
    const min = Math.max(-INT_32_MAX_VALUE, minValue === undefined ? -INT_32_MAX_VALUE : minValue);

    const handleBlur = () => {
        setInputType(InputType.TEXT);
        if (onBlur) {
            onBlur();
        }
    }
    const handleFocus = () => {
        setInputType(InputType.NUMBER);
        if (onFocus) {
            onFocus();
        }
    }

    const valueIsTooBig = (val: number) => {
        return val > max;
    };
    const valueIsTooSmall = (val: number) => {
        return val < min;
    }

    const handleChange = (value: number|undefined) => {
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

    const renderValue = (): string => {
        return value !== undefined ? value.toString() : "";
    }

    const renderInput = () => {
        return (
            <input
                ref={refInput}
                autoFocus={focusAfterMount}
                type={inputType}
                inputMode="decimal"
                placeholder={placeholder}
                className={cn(hideSpinButtons && styles.noSpinButtons)}
                onChange={(event) => {
                    if (!event.target.value || isNaN(Number(event.target.value))) {
                        handleChange(undefined);
                        return;
                    }
                    handleChange(Number(event.target.value));
                }}
                onKeyDown={event => {
                    if (event.key === "Enter" && onKeyEnter) {
                        onKeyEnter();
                    }
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={renderValue()}
                disabled={disabled}
                size={inputAutoSize ? 1 : undefined}
                step={decimalCount ? Math.pow(0.1, decimalCount) : undefined}
                min={props.minValue}
                max={props.maxValue}
            />
        );
    }

    return renderInput();
})
