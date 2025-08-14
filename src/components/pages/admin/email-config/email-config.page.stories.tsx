import React from "react";
import EmailConfigPage from "./email-config.page";
import {StoryObj} from "@storybook/nextjs";
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