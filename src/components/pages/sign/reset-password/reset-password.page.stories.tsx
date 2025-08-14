import React from "react";
import ResetPasswordPage from "./reset-password-page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: ResetPasswordPage,
    args: {}
};

export const ResetPasswordPageStory: StoryObj = {
    render: () => <ResetPasswordPage
        token={"xxx"}
    />,
    args: {}
};