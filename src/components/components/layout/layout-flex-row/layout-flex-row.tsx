import React from "react";
import styles from "./layout-flex-row.module.scss"
import {cn} from "@/src/utils/common";
import {getClassName, ILayoutFlexProps} from "@/src/components/components/layout/layout-flex/layout-flex";

export interface ILayoutFlexRowProps extends ILayoutFlexProps {
    responsive?: boolean;
    canWrap?: boolean;
}

export const LayoutFlexRow = (props: ILayoutFlexRowProps) => {
    const {gap, justifyContent,
        alignItems, tabIndex,
        children, canWrap, responsive, style} = props;

    return <div
        style={{
            alignItems: alignItems,
            justifyContent: justifyContent,
            ...style
        }}
        tabIndex={tabIndex}
        className={cn(styles.flex, gap && getClassName(gap), canWrap && styles.wrap, responsive && styles.flexResponsive)}
    >
        {children}
    </div>;
};