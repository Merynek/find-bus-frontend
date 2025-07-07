import React from "react";
import ResetPasswordPage, {IResetPasswordPageProps} from "./reset-password-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: ResetPasswordPage,
    args: {}
} as Meta<IResetPasswordPageProps>;

export const ResetPasswordPageStory: StoryObj<IResetPasswordPageProps> = {
    render: (args) => <ResetPasswordPage {...args} />,
    args: {}
};