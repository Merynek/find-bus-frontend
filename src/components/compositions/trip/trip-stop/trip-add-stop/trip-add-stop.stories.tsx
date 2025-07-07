import React from "react";
import {IStopAddPlaceProps, TripAddStop} from "./trip-add-stop";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripAddStop,
    args: {
        onAddTripPlace: () => {}
    }
} as Meta<IStopAddPlaceProps>;

export const TripAddStopStory: StoryObj<IStopAddPlaceProps> = {
    render: (args) => <TripAddStop {...args} />,
    args: {}
};