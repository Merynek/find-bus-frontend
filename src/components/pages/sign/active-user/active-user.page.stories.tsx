import React from "react";
import ActiveUserPage, {IActiveUserPageProps} from "./active-user-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: ActiveUserPage,
    args: {}
} as Meta<IActiveUserPageProps>;

export const ActiveUserPageStory: StoryObj<IActiveUserPageProps> = {
    render: (args) => <ActiveUserPage {...args} />,
    args: {}
};