import React from "react";
import EmailConfigPage, {IEmailConfigPageProps} from "./email-config.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: EmailConfigPage,
    args: {}
} as Meta<IEmailConfigPageProps>;

export const EmailConfigPageStory: StoryObj<IEmailConfigPageProps> = {
    render: (args) => <EmailConfigPage {...args} />,
    args: {}
};