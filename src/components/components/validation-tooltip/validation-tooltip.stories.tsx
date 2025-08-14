import React from "react";
import {IValidationTooltipProps, ValidationTooltip} from "./validation-tooltip";
import {ValidationState} from "../inputs/inputEnum";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: ValidationTooltip,
    args: {
        message: "tooltip here",
        validationState: ValidationState.WARNING,
        open: true
    },
    argTypes: {
        state: {
            options: Object.values(ValidationState),
            control: { type: 'select' }
        },
    },
} as Meta<IValidationTooltipProps>;

export const ValidationTooltipStory: StoryObj<IValidationTooltipProps> = {
    render: (args) => {
        return <ValidationTooltip {...args}>
            <input value={"VALUE"} onChange={() => {}} />
        </ValidationTooltip>
    },
    args: {}
};