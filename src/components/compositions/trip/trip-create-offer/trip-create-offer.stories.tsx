import {getRandomTrip} from "@/dataGenerator/trip";
import React from "react";
import {ITripCreateOfferProps, TripCreateOffer} from "./trip-create-offer";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: TripCreateOffer,
    args: {
        onMakeOffer: () => {}
    }
} as Meta<ITripCreateOfferProps>;

export const TripCreateOfferStory: StoryObj<ITripCreateOfferProps> = {
    render: (args) => <TripCreateOffer
        {...args}
        trip={getRandomTrip()}
    />,
    args: {}
};