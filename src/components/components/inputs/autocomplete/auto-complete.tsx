import React, {ReactNode, useCallback} from "react";
import AsyncSelect from 'react-select/async';

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

    const handleChange = useCallback((value: IAutoCompleteItem<T>|null) => {
        value && onChange(value);
    }, []);

    return <AsyncSelect
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
    />
}