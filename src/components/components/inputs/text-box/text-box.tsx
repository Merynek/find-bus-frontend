import React, {RefObject, useRef} from "react";
import styles from "./text-box.module.scss";
import {cn} from "@/src/utils/common";
import {InputSize} from "../inputEnum";
import {observer} from "mobx-react";
import {useMount} from "@/src/hooks/lifecycleHooks";

interface IInputBoxProps {
    size?: InputSize;
    placeholder?: string;
    refInput?: RefObject<HTMLInputElement>;
    inputAutoSize?: boolean;
    onKeyEnter?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    focusAfterMount?: boolean;
    disabled?: boolean;
    id?: string;
    name?: string;
    onClick?: () => void;
}

interface ICommonProps extends IInputBoxProps {
    type?: TextBoxType;
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
    resize?: IMultiLineResize;
}

export enum TextBoxType {
    TEXT = "text",
    PASSWORD = "password",
    EMAIL = "email"
}

export enum IMultiLineResize {
    NONE,
    BOTH,
    HORIZONTAL,
    VERTICAL
}

export const TextBox = observer((props: ITextBoxProps) => {
    const {
        refTextArea, refInput, focusAfterMount, type,
        placeholder, onKeyEnter, onBlur, onFocus,
        disabled, multiLine, disableSpaces, maxLength,
        inputAutoSize, onClick, name, id
    } = props;
    const _innerTextAreaRef = useRef<HTMLTextAreaElement>(null);

    useMount(() => {
        if (props.controlled) {
            const ref = props.refTextArea || _innerTextAreaRef;
            if (ref.current) {
                ref.current.setSelectionRange(props.value.length, props.value.length);
            }
        }
    });

    const _renderInput = () => {
        const inputProps = {
            ref: refInput,
            autoFocus: focusAfterMount,
            type: type || TextBoxType.TEXT,
            placeholder: placeholder,
            onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter" && onKeyEnter) {
                    onKeyEnter();
                }
            },
            onBlur: onBlur,
            onFocus: onFocus,
            disabled: disabled,
            maxLength: maxLength,
            size: inputAutoSize ? 1 : undefined,
            onClick: onClick,
            name: name,
            id: id,
        };

        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            let val = event.target.value;
            if (disableSpaces) {
                val = val.replace(/\s/g, '');
            }
            if (props.controlled) {
                props.onChange(val);
            }
        };

        if (props.controlled) {
            return <input {...inputProps} value={props.value} onChange={handleInputChange} />;
        } else {
            return <input {...inputProps} defaultValue={props.defaultValue} onChange={handleInputChange} />;
        }
    };

    const _renderTextArea = (multiLineData: IMultiLineData) => {
        const textAreaProps = {
            ref: refTextArea || _innerTextAreaRef,
            autoFocus: focusAfterMount,
            className: cn(_getClassNameForTextAreaResize(multiLineData.resize)),
            placeholder: placeholder,
            rows: multiLineData.rows,
            disabled: disabled,
            onBlur: onBlur,
            onFocus: onFocus,
            maxLength: maxLength,
            name: name,
            id: id,
        };

        const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (props.controlled) {
                props.onChange(event.target.value);
            }
        };

        if (props.controlled) {
            return <textarea {...textAreaProps} value={props.value} onChange={handleTextAreaChange} />;
        } else {
            return <textarea {...textAreaProps} defaultValue={props.defaultValue} onChange={handleTextAreaChange} />;
        }
    };

    const _getClassNameForTextAreaResize = (resize?: IMultiLineResize): string => {
        switch (resize) {
            default:
            case IMultiLineResize.NONE:
                return styles.textareaResizeNone;
            case IMultiLineResize.BOTH:
                return styles.textareaResizeBoth;
            case IMultiLineResize.HORIZONTAL:
                return styles.textareaResizeHorizontal;
            case IMultiLineResize.VERTICAL:
                return styles.textareaResizeVertical;
        }
    };

    return multiLine ? _renderTextArea(multiLine) : _renderInput();
});
