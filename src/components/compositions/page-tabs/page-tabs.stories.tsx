import React from "react";
import {PageTabs} from "./page-tabs";
import {Meta, StoryObj} from "@storybook/react";
import {UserRole} from "@/src/api/openapi";

export default {
    component: PageTabs,
    args: {
        message: "Are you sure man ???",
        cancelButtonText: "Cancel",
        submitButtonText: "OK",
        title: "Confirm Dialog",
        submitButtonDisabled: false
    }
};

export const PageTabsStory: StoryObj = {
    render: () => <PageTabs userDto={{
        id: 1,
        email: "test@test.cz",
        role: UserRole.ADMIN
    }} />,
    args: {}
};