import React, {CSSProperties, JSX} from "react";
import {Property} from "csstype";
import styles from "./layout-flex.module.scss";
import {FlexGap} from "@/src/enums/layout.enum";
import {cn} from "@/src/utils/common";
import {Breakpoint} from "@/src/enums/breakpoint.enum";

export interface ILayoutFlexProps {
    children: React.ReactNode;
    alignItems?: Property.AlignItems;
    justifyContent?: Property.JustifyContent;
    tabIndex?: number;
    gap?: FlexGap | IResponsiveFlex;
    style?: CSSProperties | undefined;
    htmlTag?: keyof JSX.IntrinsicElements;
}

export interface IResponsiveFlex {
    breakpoint: Breakpoint,
    above: FlexGap,
    below: FlexGap
}

export function getFlexElement(props: ILayoutFlexProps): keyof JSX.IntrinsicElements {
    const {htmlTag} = props;
    return htmlTag || "div";
}

function getGapClassName(gap: FlexGap) {
    switch (gap) {
        case FlexGap.SMALLEST_4:
            return styles.gap4;
        case FlexGap.TINY_8:
            return styles.gap8;
        case FlexGap.SMALL_16:
            return styles.gap16;
        case FlexGap.MEDIUM_24:
            return styles.gap24;
        case FlexGap.LARGE_32:
            return styles.gap32;
        case FlexGap.BIG_40:
            return styles.gap40;
    }
}

function getDesktopGapClassName(gap: FlexGap) {
    switch (gap) {
        case FlexGap.SMALLEST_4:
            return styles.desktopGap4;
        case FlexGap.TINY_8:
            return styles.desktopGap8;
        case FlexGap.SMALL_16:
            return styles.desktopGap16;
        case FlexGap.MEDIUM_24:
            return styles.desktopGap24;
        case FlexGap.LARGE_32:
            return styles.desktopGap32;
        case FlexGap.BIG_40:
            return styles.desktopGap40;
    }
}

function getMobileGapClassName(gap: FlexGap) {
    switch (gap) {
        case FlexGap.SMALLEST_4:
            return styles.mobileGap4;
        case FlexGap.TINY_8:
            return styles.mobileGap8;
        case FlexGap.SMALL_16:
            return styles.mobileGap16;
        case FlexGap.MEDIUM_24:
            return styles.mobileGap24;
        case FlexGap.LARGE_32:
            return styles.mobileGap32;
        case FlexGap.BIG_40:
            return styles.mobileGap40;
    }
}

export function getClassName(gap: FlexGap | IResponsiveFlex) {
    // responsive gap
    if (typeof(gap) === "object") {
        switch (gap.breakpoint) {
            case Breakpoint.DESKTOP_1024:
                return cn(getGapClassName(gap.above), getDesktopGapClassName(gap.below))
            case Breakpoint.MOBILE_768:
                return cn(getGapClassName(gap.above), getMobileGapClassName(gap.below))
            default:
                return ""
        }
    }
    // static gap
    else {
        return getGapClassName(gap);
    }
}