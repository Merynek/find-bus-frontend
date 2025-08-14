import React from "react";
import styles from "./layout-flex-column.module.scss"
import {cn} from "@/src/utils/common";
import {getClassName, ILayoutFlexProps} from "@/src/components/components/layout/layout-flex/layout-flex";

export const LayoutFlexColumn = (props: ILayoutFlexProps) => {
    const {gap, justifyContent,
        alignItems, tabIndex,
        children, style} = props;

    return <div
        tabIndex={tabIndex}
        style={{
            alignItems: alignItems,
            justifyContent: justifyContent,
            ...style,
        }}
        className={cn(styles.flex, gap && getClassName(gap))}
    >
        {children}
    </div>;
};
