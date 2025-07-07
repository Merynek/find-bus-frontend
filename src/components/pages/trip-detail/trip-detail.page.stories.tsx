import React from "react";
import TripDetailPage, {
    ITripDetailPageProps
} from "./trip-detail.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripDetailPage,
    args: {}
} as Meta<ITripDetailPageProps>;

export const TripDetailPageStory: StoryObj<ITripDetailPageProps> = {
    render: (args) => <TripDetailPage {...args} />,
    args: {}
};