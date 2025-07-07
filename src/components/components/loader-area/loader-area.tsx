import React from "react";
import {cn} from "@/src/utils/common";
import styles from "./loader-area.module.scss";
import gif from "./loading_gif.gif";
import {observer} from "mobx-react";

export interface ILoaderAreaProps {
    grayMode?: boolean;
    withOffset?: boolean;
}

export const LoaderArea = observer((props: ILoaderAreaProps) => {
    return (
        <div className={cn(styles.wrapper, props.grayMode && styles.wrapperGray, props.withOffset && styles.wrapperOffset)}>
            <img className={cn(styles.gif)} src={gif} alt={""} />
        </div>
    )
});