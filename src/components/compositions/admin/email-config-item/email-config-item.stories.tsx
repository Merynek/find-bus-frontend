import React from "react";
import {EmailConfigItem} from "./email-config-item";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof EmailConfigItem> = {
    component: EmailConfigItem,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof EmailConfigItem> = {
    render: (args) => <EmailConfigItem {...args} />
};