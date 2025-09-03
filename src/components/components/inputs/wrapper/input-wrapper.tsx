import React from "react";
import {Icon, IIconProps} from "@/src/components/components/icon/icon";
import styles from "@/src/components/components/inputs/wrapper/input-wrapper.module.scss";

interface IInputWrapperProps {
    id?: string;
    input: React.ReactNode;
    placeholder?: string;
    iconProps?: IIconProps;
}

export const InputWrapper = (props: IInputWrapperProps) => {
    const {input, placeholder, iconProps, id} = props;

    return <div className={styles.inputWrapper}>
        {input}
        {placeholder && <label htmlFor={id} className={styles.placeholder}>{placeholder}</label>}
        {iconProps && <Icon {...iconProps}/>}
    </div>
}