import React from "react";
import {Heading} from "./heading";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {getRandomNumber} from "@/src/utils/common";
import {Meta, StoryObj} from "@storybook/nextjs";
import {Color, FontWeight, TextAlign, TextDecoration, TextTransform} from "./textStyles";

const meta: Meta<typeof Heading> = {
    component: Heading,
    args: {
        text: getRandomText(getRandomNumber(1, 10)),
        fontWeight: FontWeight.SEMIBOLD,
        textAlign: TextAlign.LEFT,
        textTransform: TextTransform.CAPITALIZE_FIRST,
        color: Color.BLACK,
        inline: false,
        textDecoration: TextDecoration.UNDERLINE
    },
    argTypes: {
        headingLevel: {
            options: [1, 2, 3],
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

export const Default: StoryObj<typeof Heading> = {
    render: (args) => <Heading {...args} />,
    args: {}
};
