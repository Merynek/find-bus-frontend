import {getRandomOffer} from "@/dataGenerator/trip";
import React from "react";
import {TripOffer, ITripOfferProps} from "./trip-offer";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: TripOffer,
    args: {
    }
} as Meta<ITripOfferProps>;

export const TripOfferStory: StoryObj<ITripOfferProps> = {
    render: (args) => <TripOffer
        {...args}
        offer={getRandomOffer()}
    />,
    args: {}
};