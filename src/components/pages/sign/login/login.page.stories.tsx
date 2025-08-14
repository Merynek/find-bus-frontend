import React from "react";
import LoginPage from "./login-page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: LoginPage,
    args: {}
};

export const LoginPageStory: StoryObj = {
    render: () => <LoginPage />,
    args: {}
};