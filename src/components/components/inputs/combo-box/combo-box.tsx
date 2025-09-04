import React, {useCallback, useState} from "react";
import Select, {SingleValue, StylesConfig} from "react-select"
import {InputWrapper} from "@/src/components/components/inputs/wrapper/input-wrapper";

export interface IComboBoxItem<T> {
    value: T;
    label: string;
}

export interface IComboBoxProps<T> {
    id?: string;
    name?: string;
    placeHolder?: string;
    value?: IComboBoxItem<T>;
    items: IComboBoxItem<T>[];
    onChange: (value: IComboBoxItem<T>) => void;
    disabled?: boolean;
    isSearchable?: boolean;
}

export function getComboBoxStyles<T>(): StylesConfig<IComboBoxItem<T>, false> {
    return {
        control: (provided, state) => ({
            ...provided,
            border: 'none',
            borderRadius: '0',
            boxShadow: 'none',
            "> div": {
                padding: "0"
            }
        }),
        container: (provided, state) => ({
            ...provided,
            width: '100%',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            padding: '0',
        })
    }
}

export function ComboBox<T>(props: IComboBoxProps<T>) {
    const {items, onChange, value,  isSearchable,
        disabled,  placeHolder, id, name } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState<SingleValue<IComboBoxItem<T>>>(null);

    const handleChange = useCallback((newValue: SingleValue<IComboBoxItem<T>>) => {
        if (newValue) {
            onChange(newValue);
        }
        setInternalValue(newValue);
    }, [onChange]);

    const selectedValue = value !== undefined ? value : internalValue;

    return <InputWrapper
        input={<Select<IComboBoxItem<T>, false>
            menuPlacement={"auto"}
            minMenuHeight={Math.min(items.length * 40, 360)}
            closeMenuOnScroll={true}
            isDisabled={disabled}
            value={selectedValue}
            onChange={handleChange}
            options={items}
            inputId={id}
            name={name}
            placeholder={""}
            isSearchable={isSearchable === undefined ? false : isSearchable}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            styles={getComboBoxStyles()}
        />}
        placeholder={placeHolder}
        isFocused={Boolean(selectedValue) || isFocused}
    />
}