import React from "react";
import ActiveUserPage from "./active-user-page";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof ActiveUserPage> = {
    component: ActiveUserPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof ActiveUserPage> = {
    render: (args) => <ActiveUserPage
        {...args}
    />,
    args: {}
};