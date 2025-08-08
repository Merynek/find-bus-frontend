import React, {useCallback} from "react";
import Select from "react-select"
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

export function ComboBox<T>(props: IComboBoxProps<T>) {
    const locKey = "component.comboBox.";
    const {items, onChange, value,  isSearchable, disabled,  placeHolder } = props;

    const handleChange = useCallback((value: IComboBoxItem<T>|null) => {
        value && onChange(value);
    }, []);

    return <div className={styles.layout}>
        <Select
            menuPlacement={"auto"}
            minMenuHeight={Math.min(items.length * 40, 360)}
            closeMenuOnScroll={true}
            isDisabled={disabled}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            options={items}
            isSearchable={isSearchable === undefined ? false : isSearchable}
        />
    </div>
}