import React from "react";
import TripListPage from "./trip-list.page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: TripListPage,
    args: {}
};

export const TripListPageStory: StoryObj = {
    render: (args) => <TripListPage {...args} />,
    args: {}
};