import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {TripState} from "@/src/components/compositions/trip/trip-state/trip-state";
import {TripOfferState} from "@/src/api/openapi";

const meta: Meta<typeof TripState> = {
    component: TripState,
    args: {
        isActive: false,
        isCompleted: false,
        state: TripOfferState.NEW_NO_OFFERS
    },
    argTypes: {
        state: {
            options: Object.values(TripOfferState),
            control: {type: 'select'}
        },
    }
};

export default meta;

export const Default: StoryObj<typeof TripState> = {
    render: (args) => <TripState
        {...args}
    />,
    args: {}
};
