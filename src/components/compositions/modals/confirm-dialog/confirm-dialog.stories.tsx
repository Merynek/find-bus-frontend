import React from "react";
import {ConfirmDialog, IConfirmDialogProps} from "./confirm-dialog";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: ConfirmDialog,
    args: {
        message: "Are you sure man ???",
        cancelButtonText: "Cancel",
        submitButtonText: "OK",
        title: "Confirm Dialog",
        submitButtonDisabled: false
    }
} as Meta<IConfirmDialogProps>;

export const ConfirmDialogStory: StoryObj<IConfirmDialogProps> = {
    render: (args) => <ConfirmDialog {...args} />,
    args: {}
};