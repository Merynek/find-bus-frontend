import React from "react";
import {ButtonClick, ButtonSize, ButtonType} from "./button";
import {Meta, StoryObj} from "@storybook/react";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {Icon} from "../icon/icon";
import {IconType} from "@/src/enums/icon.enum";

const meta: Meta<typeof ButtonClick> = {
    component: ButtonClick,
    args: {
        label: getRandomText(1),
        size: ButtonSize.BUTTON_SIZE_M,
        type: ButtonType.YELLOW,
        rightIcon: IconType.ADD,
        isDisabled: false
    },
    argTypes: {
        type: {
            options: Object.values(ButtonType),
            control: {type: 'select'}
        },
        size: {
            options: Object.values(ButtonSize),
            control: {type: 'select'}
        },
        rightIcon: {
            options: [...Object.values(IconType), undefined],
            control: {type: 'select'}
        },
    }
};

export default meta;

export const Default: StoryObj<typeof ButtonClick> = {
    render: (args) => <ButtonClick
        {...args}
        onClick={() => {}}
    />,
    args: {}
};

export const IconButton: StoryObj<typeof ButtonClick> = {
    render: (args) => <ButtonClick
        {...args}
        onClick={() => {}}
    >
        <Icon icon={IconType.CHECK} />
    </ButtonClick>,
    args: {}
};