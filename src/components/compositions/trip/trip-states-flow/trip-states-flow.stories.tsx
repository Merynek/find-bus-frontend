import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TripStatesFlow} from "@/src/components/compositions/trip/trip-states-flow/trip-states-flow";
import {getRandomTrip} from "@/dataGenerator/trip";

const meta: Meta<typeof TripStatesFlow> = {
    component: TripStatesFlow,
    args: {
    }
};

export default meta;

export const Default: StoryObj<typeof TripStatesFlow> = {
    render: (args) => <TripStatesFlow
        {...args}
        trip={getRandomTrip()}
    />,
    args: {}
};
