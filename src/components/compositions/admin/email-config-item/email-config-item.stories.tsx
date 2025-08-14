import React from "react";
import {EmailConfigItem, IEmailConfigItemProps} from "./email-config-item";
import {getRandomEmailTemplate} from "@/dataGenerator/email";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: EmailConfigItem,
    args: {
        emailTemplate: getRandomEmailTemplate(),
        onSubmitTemplate: () => {}
    }
} as Meta<IEmailConfigItemProps>;

export const EmailConfigItemStory: StoryObj<IEmailConfigItemProps> = {
    render: (args) => <EmailConfigItem {...args} />,
    args: {}
};