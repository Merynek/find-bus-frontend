import {TripFilter} from "./trip-filter";
import React from "react";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof TripFilter> = {
    component: TripFilter,
    args: {
        params: {
            page: 1,
            dietForTransporter: false,
            maxNumberOfPersons: 0,
            onlyMine: false,
            meOffered: false,
            distanceFromInKm: 0,
            distanceToInKm: 0
        },
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof TripFilter> = {
    render: (args) => <TripFilter
        {...args}
    />
};