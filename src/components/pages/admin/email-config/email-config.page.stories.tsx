import React from "react";
import EmailConfigPage from "./email-config.page";
import {Meta, StoryObj} from "@storybook/react";
import {getRandomEmailConfig} from "@/dataGenerator/email";

export default {
    component: EmailConfigPage,
    args: {}
};

export const EmailConfigPageStory: StoryObj = {
    render: () => <EmailConfigPage
        cfg={getRandomEmailConfig()}
    />,
    args: {}
};