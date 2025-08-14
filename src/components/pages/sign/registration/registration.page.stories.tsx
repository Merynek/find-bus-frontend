import React from "react";
import RegistrationPage from "./registration-page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: RegistrationPage,
    args: {}
};

export const RegistrationPageStory: StoryObj = {
    render: () => <RegistrationPage />,
    args: {}
};