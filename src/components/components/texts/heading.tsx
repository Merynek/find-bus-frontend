import React, {JSX} from "react";
import styles from "./text.module.scss";
import {cn} from "@/src/utils/common";
import {
    Color,
    FontWeight, getColorStyle,
    getFontWeightStyle,
    getTextAlignStyle, getTextDecorationStyle, getTextTransformStyle,
    TextAlign,
    TextDecoration,
    TextTransform
} from "./textStyles";

export interface IHeadingProps {
    text: string;
    headingLevel: number;
    inline?: boolean;
    fontWeight?: FontWeight;
    textAlign?: TextAlign;
    textTransform?: TextTransform;
    textDecoration?: TextDecoration;
    color?: Color;
}

export const Heading = (props: IHeadingProps) => {
    const {headingLevel, text, inline, fontWeight,
        textAlign, textTransform, textDecoration, color} = props;

    const getFontSizeStyle = () => {
        switch (headingLevel) {
            case 1: return styles.heading1size;
            case 2: return styles.heading2size;
            case 3: return styles.heading3size;
            default: return styles.heading3size;
        }
    }

    const getClassNames = () => {
        return cn(
            inline && styles.inline,
            getFontSizeStyle(),
            getFontWeightStyle(fontWeight),
            getTextAlignStyle(textAlign),
            getTextTransformStyle(textTransform),
            getTextDecorationStyle(textDecoration),
            getColorStyle(color)
        );
    }

    const getLabelElement = (headingLevel?: number): keyof JSX.IntrinsicElements => {
        switch (headingLevel) {
            case 3: return "h3";
            case 2: return "h2";
            case 1: return "h1";
            default: return "p";
        }
    }

    const Tag = getLabelElement(1);

    return React.createElement(
        Tag,
        {
            className: cn(styles.text, getClassNames())
        },
        text
    );
};