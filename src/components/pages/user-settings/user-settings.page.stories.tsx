import React from "react";
import UserSettingsPage from "./user-settings.page";
import {StoryObj} from "@storybook/nextjs";
import {getRandomUserSettings} from "@/dataGenerator/userSettings";
import {UserSettingsConverter} from "@/src/converters/users/user-settings-converter";

export default {
    component: UserSettingsPage,
    args: {}
};

export const UserSettingsPageStory: StoryObj = {
    render: () => <UserSettingsPage
        settings={UserSettingsConverter.toJson(getRandomUserSettings())}
    />,
    args: {}
};