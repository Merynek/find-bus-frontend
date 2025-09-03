import React, {useCallback} from "react";
import Select, {SingleValue, StylesConfig} from "react-select"
import styles from "./combo-box.module.scss";

export interface IComboBoxItem<T> {
    value: T;
    label: string;
}

export interface IComboBoxProps<T> {
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
            borderBottom: '2px solid #ffea00',
            boxShadow: 'none',
            '&:hover': {
                borderBottomColor: '#ffea00'
            },
        }),
        container: (provided, state) => ({
            ...provided,
            width: '100%',
        }),
    }
}

export function ComboBox<T>(props: IComboBoxProps<T>) {
    const {items, onChange, value,  isSearchable,
        disabled,  placeHolder } = props;

    const handleChange = useCallback((newValue: SingleValue<IComboBoxItem<T>>) => {
        if (newValue) {
            onChange(newValue);
        }
    }, [onChange]);

    return <div className={styles.layout}>
        <Select<IComboBoxItem<T>, false>
            menuPlacement={"auto"}
            minMenuHeight={Math.min(items.length * 40, 360)}
            closeMenuOnScroll={true}
            isDisabled={disabled}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            options={items}
            isSearchable={isSearchable === undefined ? false : isSearchable}
            styles={getComboBoxStyles()}
        />
    </div>
}