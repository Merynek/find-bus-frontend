import React from "react";
import {Icon, IIconProps} from "@/src/components/components/icon/icon";
import styles from "@/src/components/components/inputs/wrapper/input-wrapper.module.scss";
import {cn} from "@/src/utils/common";

interface IInputWrapperProps {
    id?: string;
    input: React.ReactNode;
    placeholder?: string;
    iconProps?: IIconProps;
    isFocused?: boolean;
}

export const InputWrapper = (props: IInputWrapperProps) => {
    const {input, placeholder, iconProps, id, isFocused} = props;

    return <div className={cn(styles.inputWrapper, isFocused && styles.focused)}>
        {input}
        {placeholder && <label htmlFor={id} className={styles.placeholder}>{placeholder}</label>}
        {iconProps && <Icon {...iconProps}/>}
    </div>
}