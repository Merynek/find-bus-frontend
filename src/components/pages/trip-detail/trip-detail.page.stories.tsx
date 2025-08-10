import React from "react";
import TripDetailPage from "./trip-detail.page";
import {Meta, StoryObj} from "@storybook/react";
import {getRandomTrip} from "@/dataGenerator/trip";

export default {
    component: TripDetailPage,
    args: {}
};

export const TripDetailPageStory: StoryObj= {
    render: (args) => <TripDetailPage
        trip={getRandomTrip()}
    />,
    args: {}
};