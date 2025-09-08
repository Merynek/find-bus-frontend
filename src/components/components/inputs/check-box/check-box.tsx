import React from "react";
import styles from "./check-box.module.scss";

interface ICommonCheckBoxProps {
    id?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
}

interface IControlledProps extends ICommonCheckBoxProps {
    controlled: true;
    value: boolean;
    onChange: (value: boolean) => void;
}

interface UncontrolledProps extends ICommonCheckBoxProps {
    controlled: false;
    value?: never;
    onChange?: never;
    defaultValue?: boolean;
}

type ICheckBoxProps = IControlledProps | UncontrolledProps;

export const CheckBox = (props: ICheckBoxProps) => {
    const {disabled, label, id, onChange, value, name, controlled} = props;

    const inputProps = {
        type: "checkbox",
        disabled: disabled,
        checked: value,
        id: id,
        name: name
    };

    const renderWrapper = (input: React.ReactNode) => {
        return <label htmlFor={id} className={styles.wrapper}>
            <div>
                {input}
            </div>
            {label && <span>{label}</span>}
        </label>
    }

    if (controlled) {
        return renderWrapper(<input
            {...inputProps}
            onChange={(e) => onChange(e.target.checked)}
        />);
    }
    return renderWrapper(<input
        {...inputProps}
        type="checkbox"
        defaultChecked={props.defaultValue}
    />);
}