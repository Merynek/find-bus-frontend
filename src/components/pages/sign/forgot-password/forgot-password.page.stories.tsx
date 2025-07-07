import React from "react";
import ForgotPasswordPage, {IForgotPasswordPageProps} from "./forgot-password-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: ForgotPasswordPage,
    args: {}
} as Meta<IForgotPasswordPageProps>;

export const ForgotPasswordPageStory: StoryObj<IForgotPasswordPageProps> = {
    render: (args) => <ForgotPasswordPage {...args} />,
    args: {}
};