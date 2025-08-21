import React, {RefObject, useRef} from "react";
import styles from "./text-box.module.scss";
import {cn} from "@/src/utils/common";
import {observer} from "mobx-react";
import {useMount} from "@/src/hooks/lifecycleHooks";
import {Icon, IIconProps} from "@/src/components/components/icon/icon";

export interface IInputBoxProps {
    placeholder?: string;
    refInput?: RefObject<HTMLInputElement>;
    onBlur?: () => void;
    onFocus?: () => void;
    focusAfterMount?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    onClick?: () => void;
    iconProps?: IIconProps;
}

interface ICommonProps extends IInputBoxProps {
    type: TextBoxType;
    disableSpaces?: boolean;
    refTextArea?: RefObject<HTMLTextAreaElement>;
    multiLine?: IMultiLineData;
    maxLength?: number;
}

interface IControlledProps extends ICommonProps {
    controlled: true;
    value: string;
    onChange: (value: string) => void;
}

interface UncontrolledProps extends ICommonProps {
    controlled: false;
    value?: never;
    onChange?: never;
    defaultValue?: string;
}

export type ITextBoxProps = IControlledProps | UncontrolledProps;

interface IMultiLineData {
    rows: number
}

export enum TextBoxType {
    TEXT = "text",
    PASSWORD = "password",
    EMAIL = "email"
}

export const TextBox = observer((props: ITextBoxProps) => {
    const {
        refTextArea, refInput, focusAfterMount, type,
        placeholder, onBlur, onFocus,
        disabled, multiLine, disableSpaces, maxLength,
        onClick, name, id, iconProps, controlled,
        value, onChange
    } = props;
    const _innerTextAreaRef = useRef<HTMLTextAreaElement>(null);

    useMount(() => {
        if (controlled) {
            const ref = refTextArea || _innerTextAreaRef;
            if (ref.current) {
                ref.current.setSelectionRange(value.length, value.length);
            }
        }
    });

    const _renderInput = () => {
        const inputProps = {
            ref: refInput,
            autoFocus: focusAfterMount,
            type: type || TextBoxType.TEXT,
            placeholder: "",
            onBlur: onBlur,
            onFocus: onFocus,
            disabled: disabled,
            maxLength: maxLength,
            onClick: onClick,
            name: name,
            id: id,
            className: styles.input
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            let val = event.target.value;
            if (disableSpaces) {
                val = val.replace(/\s/g, '');
            }
            if (controlled) {
                onChange(val);
            }
        };

        if (controlled) {
            return <InputWrapper
                input={<input {...inputProps} value={value} onChange={handleInputChange}/>}
                placeholder={placeholder}
                iconProps={iconProps}
            />
        } else {
            return <InputWrapper
                input={<input {...inputProps} defaultValue={props.defaultValue} onChange={handleInputChange}/>}
                placeholder={placeholder}
                iconProps={iconProps}
            />
        }
    };

    const _renderTextArea = (multiLineData: IMultiLineData) => {
        const textAreaProps = {
            ref: refTextArea || _innerTextAreaRef,
            autoFocus: focusAfterMount,
            className: cn(styles.input),
            placeholder: "",
            rows: multiLineData.rows,
            disabled: disabled,
            onBlur: onBlur,
            onFocus: onFocus,
            maxLength: maxLength,
            name: name,
            id: id
        };

        const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (props.controlled) {
                props.onChange(event.target.value);
            }
        };

        if (props.controlled) {
            return <InputWrapper
                input={<textarea {...textAreaProps} value={props.value} onChange={handleTextAreaChange}/>}
                placeholder={placeholder}
                iconProps={iconProps}
            />
        } else {
            return <InputWrapper
                input={<textarea {...textAreaProps} defaultValue={props.defaultValue} onChange={handleTextAreaChange}/>}
                placeholder={placeholder}
                iconProps={iconProps}
            />
        }
    };

    return multiLine ? _renderTextArea(multiLine) : _renderInput();
});

interface IInputWrapperProps {
    id?: string;
    input: React.ReactNode;
    placeholder?: string;
    iconProps?: IIconProps;
}

const InputWrapper = (props: IInputWrapperProps) => {
    const {input, placeholder, iconProps, id} = props;

    return <div className={styles.inputWrapper}>
        {input}
        {placeholder && <label htmlFor={id} className={styles.placeholder}>{placeholder}</label>}
        {iconProps && <Icon {...iconProps}/>}
    </div>
}