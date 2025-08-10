import React from "react";
import ResetPasswordPage from "./reset-password-page";
import {Meta, StoryObj} from "@storybook/react";

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