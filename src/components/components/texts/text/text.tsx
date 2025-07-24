import React from "react";
import styles from "./text.module.scss";
import {cn} from "@/src/utils/common";

export enum FontSize {
    S_12 = "S_12",
    BASE_14 = "BASE_14",
    M_22 = "M_22",
    M_24 = "M_24",
    L_32 = "L_32"
}

export enum FontWeight {
    REGULAR = "REGULAR",
    SEMIBOLD = "SEMIBOLD"
}

export enum TextAlign {
    LEFT = "LEFT",
    CENTER = "CENTER",
    RIGHT = "RIGHT"
}

export enum TextTransform {
    UPPERCASE = "UPPERCASE",
    CAPITALIZE = "CAPITALIZE",
    CAPITALIZE_FIRST = "CAPITALIZE_FIRST"
}

export enum TextDecoration {
    UNDERLINE = "UNDERLINE"
}

export enum Color {
    WHITE = "WHITE",
    BLACK = "BLACK",
    YELLOW = "YELLOW"
}

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

    const getFontWeightStyle = (fontWeight: FontWeight = FontWeight.REGULAR) => {
        switch (fontWeight) {
            case FontWeight.REGULAR: return styles.fontWeightRegular;
            case FontWeight.SEMIBOLD: return styles.fontWeightSemibold;
        }
    }

    const getTextAlignStyle = (textAlign: TextAlign = TextAlign.LEFT) => {
        switch (textAlign) {
            case TextAlign.LEFT:
                return styles.textAlignLeft;
            case TextAlign.CENTER:
                return styles.textAlignCenter;
            case TextAlign.RIGHT:
                return styles.textAlignRight;
        }
    }

    const getTextTransformStyle = (textTransform?: TextTransform) => {
        switch (textTransform) {
            case TextTransform.CAPITALIZE:
                return styles.textTransformCapitalize;
            case TextTransform.CAPITALIZE_FIRST:
                return styles.textTransformCapitalizeFirst;
            case TextTransform.UPPERCASE:
                return styles.textTransformUppercase;
            default:
                return undefined;
        }
    }

    const getTextDecorationStyle = (textDecoration?: TextDecoration) => {
        switch (textDecoration) {
            case TextDecoration.UNDERLINE:
                return styles.textDecorationUnderline;
            default:
                return undefined;
        }
    }

    const getColorStyle = (color = Color.BLACK): string => {
        switch (color) {
            case Color.BLACK:
                return styles.black;
            case Color.YELLOW:
                return styles.yellow;
            case Color.WHITE:
                return styles.white;
        }
    }

    return <span
        className={cn(styles.text, getClassNames())}
    >
        {text}
    </span>;
};