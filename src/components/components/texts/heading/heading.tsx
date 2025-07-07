import {CSSProperties, default as React, ReactHTML} from "react";
import styles from "./heading.module.scss";
import {observer} from "mobx-react";
import {TextAlign} from "@/src/components/components/texts/text/text";
import {cn} from "@/src/utils/common";

export enum HeadingSize {
    Size_12 = "Size_12",
    Size_14 = "Size_14",
    Size_16 = "Size_16",
    Size_22 = "Size_22",
    Size_24 = "Size_24",
    Size_28 = "Size_28",
    Size_32 = "Size_32",
    Size_40 = "Size_40",
    Size_48 = "Size_48",
    Size_72 = "Size_72"
}

export interface IHeadingProps {
    text: string;
    fontSize: HeadingSize;
    headingLevel?: number;
    inline?: boolean;
    textAlign?: TextAlign;
    style?: CSSProperties;
}

export const Heading = observer((props: IHeadingProps) => {
    const {text, headingLevel, inline,  style, textAlign, fontSize} = props;

    const getClassNames = () => {
        return cn(
            getFontSizeStyle(fontSize),
            getTextAlignStyle(textAlign)
        );
    }

    const getFontSizeStyle = (fontSize: HeadingSize) => {
        switch (fontSize) {
            case HeadingSize.Size_12: return styles.size12;
            case HeadingSize.Size_14: return styles.size14;
            case HeadingSize.Size_16: return styles.size16;
            case HeadingSize.Size_22: return styles.size22;
            case HeadingSize.Size_24: return styles.size24;
            case HeadingSize.Size_28: return styles.size28;
            case HeadingSize.Size_32: return styles.size32;
            case HeadingSize.Size_40: return styles.size40;
            case HeadingSize.Size_48: return styles.size48;
            case HeadingSize.Size_72: return styles.size72;
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

    const getLabelElement = (headingLevel?: number): keyof ReactHTML => {
        switch (headingLevel) {
            case 6: return "h6";
            case 5: return "h5";
            case 4: return "h4";
            case 3: return "h3";
            case 2: return "h2";
            case 1: return "h1";
            default: return "label";
        }
    }

    return React.createElement(
        getLabelElement(headingLevel),
        {
            className: cn(styles.text, getClassNames(), inline && styles.inline),
            style: style
        },
        <>
            {text}
        </>
    );
})