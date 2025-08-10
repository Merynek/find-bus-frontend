import React from "react";
import ForgotPasswordPage from "./forgot-password-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: ForgotPasswordPage,
    args: {}
};

export const ForgotPasswordPageStory: StoryObj = {
    render: (args) => <ForgotPasswordPage {...args} />,
    args: {}
};