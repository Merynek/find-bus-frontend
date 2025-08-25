import React from "react";
import RegistrationPage from "./registration-page";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof RegistrationPage> = {
    component: RegistrationPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof RegistrationPage> = {
    render: () => <RegistrationPage />,
    args: {}
};
