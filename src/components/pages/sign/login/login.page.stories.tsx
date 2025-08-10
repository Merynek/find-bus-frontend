import React from "react";
import LoginPage from "./login-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: LoginPage,
    args: {}
};

export const LoginPageStory: StoryObj = {
    render: () => <LoginPage />,
    args: {}
};