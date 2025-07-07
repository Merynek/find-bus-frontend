import React from "react";
import {Icon} from "./icon";
import {Meta, StoryObj} from "@storybook/react";
import {IconType} from "@/src/enums/icon.enum";
import {getRandomEnum} from "@/dataGenerator/tools";

const meta: Meta<typeof Icon> = {
    component: Icon,
    args: {
        icon: getRandomEnum(IconType)
    },
    argTypes: {
        icon: {
            options: Object.values(IconType),
            control: {type: 'select'}
        },
    }
};

export default meta;

export const Default: StoryObj<typeof Icon> = {
    render: (args) => <Icon
        {...args}
    />,
    args: {}
};