import React, {ReactNode, useCallback} from "react";
import AsyncSelect from 'react-select/async';
import {getComboBoxStyles} from "@/src/components/components/inputs/combo-box/combo-box";
import {SingleValue} from "react-select";

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
}

export function AutoComplete<T>(props: IAutoCompleteProps<T>) {
    const {autoFocus, isDisabled, placeholder, value, emptyMessage, noOptionsMessage, loadingMessage, onChange, getFilteredItems} = props;

    const handleChange = useCallback((newValue: SingleValue<IAutoCompleteItem<T>>) => {
        if (newValue) {
            onChange(newValue);
        }
    }, [onChange]);

    return <AsyncSelect <IAutoCompleteItem<T>, false>
        autoFocus={autoFocus}
        value={value}
        isDisabled={isDisabled}
        cacheOptions={true}
        closeMenuOnSelect={true}
        placeholder={placeholder}
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
        styles={getComboBoxStyles()}
    />
}