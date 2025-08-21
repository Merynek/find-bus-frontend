import React from "react";
import {Text} from "./text";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {getRandomNumber} from "@/src/utils/common";
import {Meta, StoryObj} from "@storybook/nextjs";
import {FontSize, FontWeight, TextTransform, Color, TextAlign, TextDecoration} from "./textStyles";

const meta: Meta<typeof Text> = {
    component: Text,
    args: {
        text: getRandomText(getRandomNumber(1, 10)),
        fontSize: FontSize.L_32,
        fontWeight: FontWeight.SEMIBOLD,
        textAlign: TextAlign.LEFT,
        textTransform: TextTransform.CAPITALIZE_FIRST,
        color: Color.BLACK,
        inline: false,
        textDecoration: TextDecoration.UNDERLINE
    },
    argTypes: {
        fontSize: {
            options: Object.values(FontSize),
            control: {type: 'select'}
        },
        textDecoration: {
            options: Object.values(TextDecoration),
            control: {type: 'select'}
        },
        fontWeight: {
            options: Object.values(FontWeight),
            control: {type: 'select'}
        },
        textAlign: {
            options: Object.values(TextAlign),
            control: {type: 'select'}
        },
        textTransform: {
            options: Object.values(TextTransform),
            control: {type: 'select'}
        },
        color: {
            options: Object.values(Color),
            control: {type: 'select'}
        }
    }
}

export default meta;

export const Default: StoryObj<typeof Text> = {
    render: (args) => <Text {...args} />,
    args: {}
};
