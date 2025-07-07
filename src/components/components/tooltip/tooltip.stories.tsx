import React from "react";
import {ITooltipProps, Tooltip} from "./tooltip";
import {ValidationState} from "../inputs/inputEnum";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: Tooltip,
    args: {
        message: "tooltip here",
        validationState: ValidationState.WARNING,
        arrow: true,
        placement: "right"
    },
    argTypes: {
        validationState: {
            options: [ValidationState.NORMAL, ValidationState.ERROR, ValidationState.WARNING, ValidationState.SUCCESS],
            control: { type: 'select' }
        },
        placement: {
            options: ['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end',  'top-start', 'top'],
            control: { type: 'select' }
        },
    }
} as Meta<ITooltipProps>;

export const TooltipStory: StoryObj<ITooltipProps> = {
    render: (args) => {
        return <Tooltip {...args}>
            <span>Content with tooltip :-)</span>
        </Tooltip>
    },
    args: {}
};

