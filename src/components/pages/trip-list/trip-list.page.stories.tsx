import React from "react";
import TripListPage, {ITripListPageProps} from "./trip-list.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripListPage,
    args: {}
} as Meta<ITripListPageProps>;

export const TripListPageStory: StoryObj<ITripListPageProps> = {
    render: (args) => <TripListPage {...args} />,
    args: {}
};