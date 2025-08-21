import styles from "@/src/components/components/texts/text.module.scss";

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

export const getFontWeightStyle = (fontWeight: FontWeight = FontWeight.REGULAR) => {
    switch (fontWeight) {
        case FontWeight.REGULAR: return styles.fontWeightRegular;
        case FontWeight.SEMIBOLD: return styles.fontWeightSemibold;
    }
}

export const getTextAlignStyle = (textAlign: TextAlign = TextAlign.LEFT) => {
    switch (textAlign) {
        case TextAlign.LEFT:
            return styles.textAlignLeft;
        case TextAlign.CENTER:
            return styles.textAlignCenter;
        case TextAlign.RIGHT:
            return styles.textAlignRight;
    }
}

export const getTextTransformStyle = (textTransform?: TextTransform) => {
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

export const getTextDecorationStyle = (textDecoration?: TextDecoration) => {
    switch (textDecoration) {
        case TextDecoration.UNDERLINE:
            return styles.textDecorationUnderline;
        default:
            return undefined;
    }
}

export const getColorStyle = (color = Color.BLACK): string => {
    switch (color) {
        case Color.BLACK:
            return styles.black;
        case Color.YELLOW:
            return styles.yellow;
        case Color.WHITE:
            return styles.white;
    }
}