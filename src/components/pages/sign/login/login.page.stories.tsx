import React from "react";
import LoginPage, {ILoginPageProps} from "./login-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: LoginPage,
    args: {}
} as Meta<ILoginPageProps>;

export const LoginPageStory: StoryObj<ILoginPageProps> = {
    render: (args) => <LoginPage {...args} />,
    args: {}
};