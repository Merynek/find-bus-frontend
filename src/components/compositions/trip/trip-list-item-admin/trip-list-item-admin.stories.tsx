import {getRandomTripItem} from "@/dataGenerator/trip";
import React from "react";
import {TripListItemAdmin} from "./trip-list-item-admin";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof TripListItemAdmin> = {
    component: TripListItemAdmin,
    args: {
    },
};

export default meta;

export const Default: StoryObj<typeof TripListItemAdmin> = {
    render: (args) => <TripListItemAdmin
        {...args}
        tripItem={getRandomTripItem()}
    />,
    args: {}
};
