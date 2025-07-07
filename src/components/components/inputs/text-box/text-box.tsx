import React, {RefObject, useRef} from "react";
import styles from "./text-box.module.scss";
import {cn} from "@/src/utils/common";
import {InputSize} from "../inputEnum";
import {observer} from "mobx-react";
import {useMount} from "@/src/hooks/lifecycleHooks";

export interface IInputBoxProps {
    size?: InputSize;
    placeholder?: string;
    refInput?: RefObject<HTMLInputElement>;
    inputAutoSize?: boolean;
    onKeyEnter?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    focusAfterMount?: boolean;
    disabled?: boolean;
}

export interface ITextBoxProps extends IInputBoxProps {
    onChange: (value: string) => void;
    type?: TextBoxType;
    disableSpaces?: boolean;
    refTextArea?: RefObject<HTMLTextAreaElement>;
    multiLine?: IMultiLineData;
    value: string;
    maxLength?: number;
    onClick?: () => void;
}

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
    const {refTextArea,  refInput, focusAfterMount, type,
        placeholder, onChange, onKeyEnter,
        onBlur, onFocus, value, disabled, multiLine,
        disableSpaces, maxLength, inputAutoSize, onClick} = props;
    const _innerTextAreaRef = useRef<HTMLTextAreaElement>(null);

    useMount(() => {
        const ref = refTextArea || _innerTextAreaRef;

        if (ref.current) {
            ref.current.setSelectionRange(value.length, value.length);
        }
    })

    const _renderInput = () => {
        return <input
            ref={refInput}
            autoFocus={focusAfterMount}
            type={type || TextBoxType.TEXT}
            placeholder={placeholder}
            onChange={(event) => {
                let val = event.target.value;
                if (disableSpaces) {
                    val = val.replace(/\s/g, '');
                }
                onChange(val);
            }}
            onKeyDown={event => {
                if (event.key === "Enter" && onKeyEnter) {
                    onKeyEnter();
                }
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            size={inputAutoSize ? 1 : undefined}
            onClick={onClick}
        />
    }

    const _renderTextArea = (multiLineData: IMultiLineData) => {
        return (
            <textarea
                ref={refTextArea || _innerTextAreaRef}
                autoFocus={focusAfterMount}
                className={cn(_getClassNameForTextAreaResize(multiLineData.resize))}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                rows={multiLineData.rows}
                value={value}
                disabled={disabled}
                onBlur={onBlur}
                onFocus={onFocus}
                maxLength={maxLength}
            />
        );
    }

    const _getClassNameForTextAreaResize = (resize?: IMultiLineResize): string => {
        switch (resize) {
            default:
            case IMultiLineResize.NONE:
                return styles.textareaResizeNone
            case IMultiLineResize.BOTH:
                return styles.textareaResizeBoth;
            case IMultiLineResize.HORIZONTAL:
                return styles.textareaResizeHorizontal;
            case IMultiLineResize.VERTICAL:
                return styles.textareaResizeVertical;
        }
    }

    return multiLine ? _renderTextArea(multiLine) : _renderInput()
});

