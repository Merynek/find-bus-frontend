import React from "react";
import {IPageTabsProps, PageTabs} from "./page-tabs";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: PageTabs,
    args: {
        message: "Are you sure man ???",
        cancelButtonText: "Cancel",
        submitButtonText: "OK",
        title: "Confirm Dialog",
        submitButtonDisabled: false
    }
} as Meta<IPageTabsProps>;

export const PageTabsStory: StoryObj<IPageTabsProps> = {
    render: (args) => <PageTabs {...args} />,
    args: {}
};