import {InputSize} from "../../../../components/inputs/inputEnum";
import {getRandomTrip} from "@/dataGenerator/trip";
import React from "react";
import {ITripStopProps, TripStop} from "./trip-stop";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: TripStop,
    args: {
        canEdit: true
    },
    argTypes: {
        size: {
            options: Object.values(InputSize),
            control: { type: 'select' }
        }
    },
} as Meta<ITripStopProps>;

export const TripStopStory: StoryObj<ITripStopProps> = {
    render: (args) => {
        const trip = getRandomTrip();
        const stop = trip.stops[0]

        return <TripStop
            {...args}
            trip={trip}
            stop={stop}
        />
    },
    args: {}
};