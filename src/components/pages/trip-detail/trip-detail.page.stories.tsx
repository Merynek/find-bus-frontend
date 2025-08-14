import React from "react";
import TripDetailPage from "./trip-detail.page";
import {StoryObj} from "@storybook/nextjs";
import {getRandomTrip} from "@/dataGenerator/trip";

export default {
    component: TripDetailPage,
    args: {}
};

export const TripDetailPageStory: StoryObj= {
    render: () => <TripDetailPage
        trip={getRandomTrip()}
    />,
    args: {}
};