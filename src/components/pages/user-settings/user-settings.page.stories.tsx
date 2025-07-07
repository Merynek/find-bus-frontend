import React from "react";
import UserSettingsPage, {IUserSettingsPageProps} from "./user-settings.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: UserSettingsPage,
    args: {}
} as Meta<IUserSettingsPageProps>;

export const UserSettingsPageStory: StoryObj<IUserSettingsPageProps> = {
    render: (args) => <UserSettingsPage {...args} />,
    args: {}
};