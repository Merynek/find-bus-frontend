import React from "react";
import styles from "./layout-flex-column.module.scss"
import {cn} from "@/src/utils/common";
import {
    getClassName,
    getFlexElement,
    ILayoutFlexProps
} from "@/src/components/components/layout/layout-flex/layout-flex";

export const LayoutFlexColumn = (props: ILayoutFlexProps) => {
    const {gap, justifyContent,
        alignItems, tabIndex,
        children, style} = props;

    return React.createElement(
        getFlexElement(props),
        {
            className: cn(styles.flex, gap && getClassName(gap)),
            style: {
                alignItems: alignItems,
                justifyContent: justifyContent,
                ...style,
            },
            tabIndex: tabIndex
        },
        children
    );
};
