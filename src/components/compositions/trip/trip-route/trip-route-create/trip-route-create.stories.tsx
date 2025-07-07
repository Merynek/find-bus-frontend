import React from "react";
import {ITripRouteCreateProps, TripRouteCreate} from "./trip-route-create";
import {getRandomTrip} from "@/dataGenerator/trip";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripRouteCreate,
    args: {
        editable: true
    }
} as Meta<ITripRouteCreateProps>;

export const TripRouteCreateStory: StoryObj<ITripRouteCreateProps> = {
    render: (args) => {
        const trip = getRandomTrip();
        const route = trip.routes[0];

        return <TripRouteCreate
            {...args}
            trip={trip}
            route={route}
        />
    },
    args: {}
};