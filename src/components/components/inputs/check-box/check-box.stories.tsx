import React from "react";
import {CheckBox, ICheckBoxProps} from "./check-box";
import {getRandomEnum} from "@/dataGenerator/tools";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {CheckBoxSize} from "@/src/enums/check-box.enum";

export default {
    component: CheckBox,
    args: {
        value: true,
        size: getRandomEnum(CheckBoxSize),
        onChange: () => {},
        disabled: false,
        label: getRandomText(1)
    },
    argTypes: {
        size: {
            options: Object.values(CheckBoxSize),
            control: {type: 'select'}
        },
    }
} as Meta<ICheckBoxProps>;

export const CheckBoxStory: StoryObj<ICheckBoxProps> = {
    render: (args) => <CheckBox
        {...args}
    />,
    args: {}
};