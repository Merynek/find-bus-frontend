import React from "react";
import TripListPage from "./trip-list.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripListPage,
    args: {}
};

export const TripListPageStory: StoryObj = {
    render: (args) => <TripListPage {...args} />,
    args: {}
};