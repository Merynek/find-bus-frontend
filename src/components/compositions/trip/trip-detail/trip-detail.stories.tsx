import {getRandomTrip} from "@/dataGenerator/trip";
import React from "react";
import {ITripDetailProps, TripDetail} from "./trip-detail";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripDetail,
    args: {
    }
} as Meta<ITripDetailProps>;

export const TripDetailStory: StoryObj<ITripDetailProps> = {
    render: (args) => <TripDetail
        {...args}
        trip={getRandomTrip()}
    />,
    args: {}
};