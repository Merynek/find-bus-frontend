import {getRandomOffer, getRandomTrip} from "@/dataGenerator/trip";
import React from "react";
import {ITripOfferAcceptProps, TripOfferAccept} from "./trip-offer-accept";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: TripOfferAccept,
    args: {
        onAcceptOffer: () => {}
    }
} as Meta<ITripOfferAcceptProps>;

export const TripOfferAcceptStory: StoryObj<ITripOfferAcceptProps> = {
    render: (args) => <TripOfferAccept
        {...args}
        offer={getRandomOffer()}
        trip={getRandomTrip()}
    />,
    args: {}
};