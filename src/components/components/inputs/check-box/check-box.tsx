import React from "react";
import styles from "./check-box.module.scss";

interface ICommonCheckBoxProps {
    id?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
    value?: string;
}

interface IControlledProps extends ICommonCheckBoxProps {
    controlled: true;
    checked: boolean;
    onChange: (value: boolean) => void;
}

interface IUncontrolledProps extends ICommonCheckBoxProps {
    controlled: false;
    checked?: never;
    onChange?: never;
    defaultChecked?: boolean;
}

type ICheckBoxProps = IControlledProps | IUncontrolledProps;

export const CheckBox = (props: ICheckBoxProps) => {
    const {disabled, label, id, onChange, value, name, controlled, checked} = props;

    const inputProps = {
        type: "checkbox",
        disabled: disabled,
        checked: checked,
        id: id,
        name: name,
        value: value
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
        defaultChecked={props.defaultChecked}
    />);
}