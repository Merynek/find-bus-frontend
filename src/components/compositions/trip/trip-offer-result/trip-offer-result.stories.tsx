import {getRandomOffer, getRandomTrip} from "@/dataGenerator/trip";
import React from "react";
import {ITripOfferResultProps, TripOfferResult} from "./trip-offer-result";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripOfferResult,
    args: {
    }
} as Meta<ITripOfferResultProps>;

export const TripOfferResultStory: StoryObj<ITripOfferResultProps> = {
    render: (args) => <TripOfferResult
        {...args}
        trip={getRandomTrip()}
        offers={[getRandomOffer(), getRandomOffer()]}
    />,
    args: {}
};