import React from "react";
import styles from "./radio-input.module.scss";

interface IRadioInputProps {
    id: string;
    name: string;
    value: string;
    label: string;
}

export const RadioInput = (props: IRadioInputProps) => {
    const { id, name, value, label } = props;

    return (
        <div className={styles.layout}>
            <input
                type={"radio"}
                id={id}
                name={name}
                value={value}
                className={styles.radioInput}
            />
            <span
                className={styles.customRadio}>
                <span
                    className={styles.customRadioDot}>
                </span>
            </span>

            <label
                htmlFor={id}
                className={styles.label}
            >
                {label}
            </label>
        </div>
    );
};