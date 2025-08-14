import {StoryObj} from "@storybook/nextjs";
import React from "react";
import HomePage from "./home-page";

export default {
    component: HomePage,
    args: {}
};

export const HomePageStory: StoryObj = {
    render: (args) => <HomePage {...args} />,
    args: {}
};