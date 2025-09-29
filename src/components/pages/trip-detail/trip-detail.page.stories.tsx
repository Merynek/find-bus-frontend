import React from "react";
import TripDetailPage from "./trip-detail.page";
import {StoryObj} from "@storybook/nextjs";
import {getRandomTrip} from "@/dataGenerator/trip";
import {getRandomAppBusinessConfig} from "@/dataGenerator/appBusinessConfig";

export default {
    component: TripDetailPage,
    args: {}
};

export const TripDetailPageStory: StoryObj= {
    render: () => <TripDetailPage
        trip={getRandomTrip()}
        config={getRandomAppBusinessConfig()}
    />,
    args: {}
};