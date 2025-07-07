import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import HomePage, {IHomePageProps} from "./home-page";

export default {
    component: HomePage,
    args: {}
} as Meta<IHomePageProps>;

export const HomePageStory: StoryObj<IHomePageProps> = {
    render: (args) => <HomePage {...args} />,
    args: {}
};