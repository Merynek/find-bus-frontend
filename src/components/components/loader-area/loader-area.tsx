import React from "react";
import {cn} from "@/src/utils/common";
import styles from "./loader-area.module.scss";
import {observer} from "mobx-react";
import Image from "next/image";

export interface ILoaderAreaProps {
    grayMode?: boolean;
    withOffset?: boolean;
}

export const LoaderArea = observer((props: ILoaderAreaProps) => {
    return (
        <div className={cn(styles.wrapper, props.grayMode && styles.wrapperGray, props.withOffset && styles.wrapperOffset)}>
            <Image className={cn(styles.gif)} src={"/global/loading_gif.gif"} alt={"loading"} width={100} height={100} />
        </div>
    )
});