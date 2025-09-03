import React from "react";
import styles from "./check-box.module.scss";

export interface ICheckBoxProps {
    value: boolean;
    id?: string;
    label?: string;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}

export const CheckBox = (props: ICheckBoxProps) => {
    const {disabled, label, id, onChange, value} = props;

    return (
        <label htmlFor={id} className={styles.wrapper}>
            <div>
                <input
                    type="checkbox"
                    disabled={disabled}
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    id={id}
                />
            </div>
            {label && <span>{label}</span>}
        </label>
    );
}