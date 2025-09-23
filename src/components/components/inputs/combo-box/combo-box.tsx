import React, {useCallback, useState} from "react";
import Select, {SingleValue, StylesConfig} from "react-select"
import {InputWrapper} from "@/src/components/components/inputs/wrapper/input-wrapper";

export interface IComboBoxItem<T> {
    value: T;
    label: string;
}

interface ICommonProps<T> {
    id?: string;
    name?: string;
    placeHolder?: string;
    items: IComboBoxItem<T>[];
    disabled?: boolean;
    isSearchable?: boolean;
    instanceId: string;
}

interface IControlledComboBoxProps<T> extends ICommonProps<T> {
    controlled: true;
    value?: IComboBoxItem<T>;
    onChange: (value: IComboBoxItem<T>) => void;
    defaultValue?: never;
}

interface IUncontrolledComboBoxProps<T> extends ICommonProps<T> {
    controlled: false;
    value?: never;
    onChange?: never;
    defaultValue?: IComboBoxItem<T>;
}

export type IComboBoxProps<T> = IControlledComboBoxProps<T> | IUncontrolledComboBoxProps<T>;

export function getComboBoxStyles<T>(): StylesConfig<IComboBoxItem<T>, false> {
    return {
        control: (provided) => ({
            ...provided,
            border: 'none',
            borderRadius: '0',
            boxShadow: 'none',
            "> div": {
                padding: "0"
            }
        }),
        container: (provided) => ({
            ...provided,
            width: '100%',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: '0',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 1000,
        })
    }
}

export function ComboBox<T>(props: IComboBoxProps<T>) {
    const {items, onChange, value,  isSearchable,
        disabled,  placeHolder, id, name, controlled, instanceId, defaultValue } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState<SingleValue<IComboBoxItem<T>>>(null);

    const handleChange = useCallback((newValue: SingleValue<IComboBoxItem<T>>) => {
        if (controlled) {
            onChange(newValue as IComboBoxItem<T>);
        }
        setInternalValue(newValue);
    }, [controlled, onChange]);

    const selectedValue = value !== undefined ? value : internalValue || defaultValue;

    return <InputWrapper
        input={<Select<IComboBoxItem<T>, false>
            instanceId={instanceId}
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