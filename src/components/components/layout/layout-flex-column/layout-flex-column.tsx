import React from "react";
import styles from "./layout-flex-column.module.scss"
import {cn} from "@/src/utils/common";
import {getClassName, ILayoutFlexProps} from "@/src/components/components/layout/layout-flex/layout-flex";
import {observer} from "mobx-react";

export interface ILayoutFlexColumnProps extends ILayoutFlexProps {}

export const LayoutFlexColumn = observer((props: ILayoutFlexColumnProps) => {
    const {gap, justifyContent,
        alignItems, tabIndex,
        elementRef, children, style} = props;

    return <div
        tabIndex={tabIndex}
        style={{
            alignItems: alignItems,
            justifyContent: justifyContent,
            ...style,
        }}
        ref={elementRef}
        className={cn(styles.flex, gap && getClassName(gap))}
    >
        {children}
    </div>;
});
