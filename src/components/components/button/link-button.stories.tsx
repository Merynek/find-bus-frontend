import React from "react";
import {
    ButtonLink,
    ButtonSize,
    ButtonType,
} from "./button";
import {ROUTES} from "@/src/enums/router.enum";
import {Meta, StoryObj} from "@storybook/react";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {IconType} from "@/src/enums/icon.enum";

const meta: Meta<typeof ButtonLink> = {
    component: ButtonLink,
    args: {
        label: getRandomText(1),
        size: ButtonSize.BUTTON_SIZE_M,
        type: ButtonType.YELLOW,
        rightIcon: IconType.ADD,
        isDisabled: false,
        route: {route: ROUTES.ACTIVE_USER}
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

export const Default: StoryObj<typeof ButtonLink> = {
    render: (args) => <ButtonLink
        {...args}
    />,
    args: {}
};