import React, {ReactNode, useCallback, useState} from "react";
import AsyncSelect from 'react-select/async';
import {getComboBoxStyles} from "@/src/components/components/inputs/combo-box/combo-box";
import {SingleValue} from "react-select";
import {InputWrapper} from "@/src/components/components/inputs/wrapper/input-wrapper";

export interface IAutoCompleteItem<T> {
    value: T;
    label: string;
}

type fetchItems<T> = (filter: string) => Promise<IAutoCompleteItem<T>[]>;

export interface IAutoCompleteProps<T> {
    getFilteredItems: fetchItems<T>;
    onChange: (item: IAutoCompleteItem<T>) => void;
    placeholder?: string;
    loadingMessage?: string;
    emptyMessage?: string;
    isDisabled?: boolean;
    value?: IAutoCompleteItem<T>;
    autoFocus?: boolean;
    noOptionsMessage?: (obj: {
        inputValue: string;
    }) => ReactNode;
    id?: string;
    name?: string;
}

export function AutoComplete<T>(props: IAutoCompleteProps<T>) {
    const {autoFocus, isDisabled, placeholder, value, emptyMessage, noOptionsMessage, loadingMessage,
        onChange, getFilteredItems, id, name} = props;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState<SingleValue<IAutoCompleteItem<T>>>(null);

    const handleChange = useCallback((newValue: SingleValue<IAutoCompleteItem<T>>) => {
        if (newValue) {
            onChange(newValue);
        }
        setInternalValue(newValue);
    }, [onChange]);

    const selectedValue = value !== undefined ? value : internalValue;

    return <InputWrapper
        input={<AsyncSelect <IAutoCompleteItem<T>, false>
            id={id}
            name={name}
            autoFocus={autoFocus}
            value={selectedValue}
            isDisabled={isDisabled}
            cacheOptions={true}
            closeMenuOnSelect={true}
            placeholder={""}
            noOptionsMessage={noOptionsMessage || ((input) => {
                if (input.inputValue.length < 3) {
                    return null;
                }
                return emptyMessage || null;
            })}
            loadingMessage={() => loadingMessage || "Loading..."}
            onChange={handleChange}
            backspaceRemovesValue={false}
            loadOptions={getFilteredItems}
            menuPortalTarget={null}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            styles={getComboBoxStyles()}
        />}
        placeholder={placeholder}
        isFocused={Boolean(selectedValue) || isFocused}
    />
}