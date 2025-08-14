import React from "react";
import ForgotPasswordPage from "./forgot-password-page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: ForgotPasswordPage,
    args: {}
};

export const ForgotPasswordPageStory: StoryObj = {
    render: (args) => <ForgotPasswordPage {...args} />,
    args: {}
};