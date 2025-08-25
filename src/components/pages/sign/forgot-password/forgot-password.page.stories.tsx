import React from "react";
import ForgotPasswordPage from "./forgot-password-page";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof ForgotPasswordPage> = {
    component: ForgotPasswordPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof ForgotPasswordPage> = {
    render: () => <ForgotPasswordPage />,
    args: {}
};