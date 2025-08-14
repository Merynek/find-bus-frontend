import {getRandomTrip} from "@/dataGenerator/trip";
import React from "react";
import {ITripDetailProps, TripDetail} from "./trip-detail";
import {Meta, StoryObj} from "@storybook/nextjs";
import {TripConverter} from "@/src/converters/trip/trip-converter";

export default {
    component: TripDetail,
    args: {
    }
} as Meta<ITripDetailProps>;

export const TripDetailStory: StoryObj<ITripDetailProps> = {
    render: (args) => <TripDetail
        {...args}
        trip={TripConverter.toJson(getRandomTrip())}
    />,
    args: {}
};