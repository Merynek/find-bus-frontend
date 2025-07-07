import React from "react";
import RegistrationPage, {IRegistrationPageProps} from "./registration-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: RegistrationPage,
    args: {}
} as Meta<IRegistrationPageProps>;

export const RegistrationPageStory: StoryObj<IRegistrationPageProps> = {
    render: (args) => <RegistrationPage {...args} />,
    args: {}
};