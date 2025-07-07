import React from "react";
import AppConfigPage, {IAppConfigPageProps} from "./app-config.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: AppConfigPage,
    args: {}
} as Meta<IAppConfigPageProps>;

export const AppConfigPageStory: StoryObj<IAppConfigPageProps> = {
    render: (args) => <AppConfigPage {...args} />,
    args: {}
};