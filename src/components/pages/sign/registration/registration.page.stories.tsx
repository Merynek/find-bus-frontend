import React from "react";
import RegistrationPage from "./registration-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: RegistrationPage,
    args: {}
};

export const RegistrationPageStory: StoryObj = {
    render: () => <RegistrationPage />,
    args: {}
};