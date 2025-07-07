import {Meta, StoryObj} from "@storybook/react";
import {TextAlign} from "@/src/components/components/texts/text/text";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {getRandomNumber} from "@/src/utils/common";
import React from "react";
import {Heading, HeadingSize} from "@/src/components/components/texts/heading/heading";

const meta: Meta<typeof Heading> = {
    component: Heading,
    args: {
        text: getRandomText(getRandomNumber(1, 10)),
        fontSize: HeadingSize.Size_40,
        textAlign: TextAlign.LEFT,
        inline: false,
        headingLevel: 2
    },
    argTypes: {
        fontSize: {
            options: Object.values(HeadingSize),
            control: {type: 'select'}
        },
        textAlign: {
            options: Object.values(TextAlign),
            control: {type: 'select'}
        }
    }
}

export default meta;

export const Default: StoryObj<typeof Heading> = {
    render: (args) => <Heading {...args} />,
    args: {}
};
