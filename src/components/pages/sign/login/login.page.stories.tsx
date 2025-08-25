import React from "react";
import LoginPage from "./login-page";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof LoginPage> = {
    component: LoginPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof LoginPage> = {
    render: () => <LoginPage />,
    args: {}
};
