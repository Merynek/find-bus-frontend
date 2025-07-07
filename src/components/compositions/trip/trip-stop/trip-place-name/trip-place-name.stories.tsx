import React from "react";
import {ITripPlaceNameProps, TripPlaceName} from "./trip-place-name";
import {getRandomStop} from "@/dataGenerator/stop";
import {getRandomTrip} from "@/dataGenerator/trip";
import {InputSize} from "../../../../components/inputs/inputEnum";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripPlaceName,
    args: {
        disabled: false,
        displayBorder: false,
        size: InputSize.SMALL
    },
    argTypes: {
        size: {
            options: Object.values(InputSize),
            control: { type: 'select' }
        }
    }
} as Meta<ITripPlaceNameProps>;

export const TripPlaceNameStory: StoryObj<ITripPlaceNameProps> = {
    render: (args) => <TripPlaceName
        {...args}
        trip={getRandomTrip()}
        stop={getRandomStop()}
    />,
    args: {}
};