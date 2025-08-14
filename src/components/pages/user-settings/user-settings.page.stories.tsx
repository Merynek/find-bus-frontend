import React from "react";
import UserSettingsPage from "./user-settings.page";
import {StoryObj} from "@storybook/nextjs";
import {getRandomUserSettings} from "@/dataGenerator/userSettings";
import {UsersConverter} from "@/src/converters/users/users-converter";

export default {
    component: UserSettingsPage,
    args: {}
};

export const UserSettingsPageStory: StoryObj = {
    render: () => <UserSettingsPage
        settings={UsersConverter.userSettingsToJson(getRandomUserSettings())}
    />,
    args: {}
};