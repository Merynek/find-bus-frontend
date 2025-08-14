import React from "react";
import {ITripRouteRecommendationProps, TripRouteRecommendation} from "./trip-route-recommendation";
import {getRandomTrip} from "@/dataGenerator/trip";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: TripRouteRecommendation,
    args: {
        editable: true
    }
} as Meta<ITripRouteRecommendationProps>;

export const TripRouteRecommendationStory: StoryObj<ITripRouteRecommendationProps> = {
    render: (args) => {
        const trip = getRandomTrip();
        const route = trip.routes[0];

        return <TripRouteRecommendation
            {...args}
            trip={trip}
            route={route}
        />
    },
    args: {}
};