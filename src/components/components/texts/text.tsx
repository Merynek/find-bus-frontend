import React from "react";
import styles from "./text.module.scss";
import {cn} from "@/src/utils/common";
import {
    Color,
    FontSize,
    FontWeight,
    getColorStyle,
    getFontWeightStyle,
    getTextAlignStyle, getTextDecorationStyle,
    getTextTransformStyle,
    TextAlign,
    TextDecoration,
    TextTransform
} from "@/src/components/components/texts/textStyles";

export interface ITextProps {
    text: string;
    inline?: boolean;
    fontSize: FontSize;
    fontWeight?: FontWeight;
    textAlign?: TextAlign;
    textTransform?: TextTransform;
    textDecoration?: TextDecoration;
    color?: Color;
}

export const Text = (props: ITextProps) => {
    const {text, inline, fontSize, fontWeight,
        textAlign, textTransform, textDecoration, color} = props;

    const getClassNames = () => {
        return cn(
            inline && styles.inline,
            getFontSizeStyle(fontSize),
            getFontWeightStyle(fontWeight),
            getTextAlignStyle(textAlign),
            getTextTransformStyle(textTransform),
            getTextDecorationStyle(textDecoration),
            getColorStyle(color)
        );
    }

    const getFontSizeStyle = (fontSize: FontSize) => {
        switch (fontSize) {
            case FontSize.S_12: return styles.small;
            case FontSize.BASE_14: return styles.base;
            case FontSize.M_22: return styles.medium;
            case FontSize.M_24: return styles.mediumLarge;
            case FontSize.L_32: return styles.large;
        }
    }

    return <span
        className={cn(styles.text, getClassNames())}
    >
        {text}
    </span>;
};