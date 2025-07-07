import React from "react";
import styles from "./check-box.module.scss";
import {cn} from "@/src/utils/common";
import {CheckBoxSize} from "@/src/enums/check-box.enum";
import {observer} from "mobx-react";

export interface ICheckBoxProps {
    value: boolean;
    label?: string;
    onChange: (value: boolean) => void;
    size: CheckBoxSize;
    disabled?: boolean;
}

export const CheckBox = observer((props: ICheckBoxProps) => {
    const {size, disabled, label} = props;

    return <label className={styles.wrapper} >
        <div className={cn(
            styles.container,
            getClassSize(size)
        )}>
            <input
                type="checkbox"
                disabled={disabled}
                checked={props.value}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => props.onChange(e.target.checked)}
            />
        </div>
        {label && <span>{label}</span>}
    </label>;
});

function getClassSize(size: CheckBoxSize): string {
    switch (size) {
        case CheckBoxSize.BIG:
            return styles.big;
        case CheckBoxSize.MEDIUM:
            return styles.medium;
        case CheckBoxSize.SMALL:
            return styles.small;
    }
}