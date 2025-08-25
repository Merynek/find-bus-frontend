import React from "react";
import ResetPasswordPage from "./reset-password-page";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof ResetPasswordPage> = {
    component: ResetPasswordPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof ResetPasswordPage> = {
    render: (args) => <ResetPasswordPage
        {...args}
    />,
    args: {}
};
