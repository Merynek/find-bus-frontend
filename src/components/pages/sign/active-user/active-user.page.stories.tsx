import React from "react";
import ActiveUserPage from "./active-user-page";
import {Meta, StoryObj} from "@storybook/react";

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