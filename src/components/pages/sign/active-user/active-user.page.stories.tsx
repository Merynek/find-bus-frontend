import React from "react";
import ActiveUserPage from "./active-user-page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: ActiveUserPage,
    args: {}
};

export const ActiveUserPageStory: StoryObj = {
    render: () => <ActiveUserPage
        code={"xxx"}
    />,
    args: {}
};