import React from "react";
import {ITripListItemProps, TripListItem} from "./trip-list-item";
import {getRandomTripItem} from "@/dataGenerator/trip";
import {Meta, StoryObj} from "@storybook/nextjs";
import {TripItemConverter} from "@/src/converters/trip-item-converter";

export default {
    component: TripListItem,
    args: {
    }
} as Meta<ITripListItemProps>;

export const TripListItemStory: StoryObj<ITripListItemProps> = {
    render: (args) => <TripListItem
        {...args}
        tripItem={TripItemConverter.toJson(getRandomTripItem())}
    />,
    args: {}
};