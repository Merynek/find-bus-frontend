import {getRandomOffer, getRandomTrip} from "@/dataGenerator/trip";
import React from "react";
import {TripOfferAccept} from "./trip-offer-accept";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomAppBusinessConfig} from "@/dataGenerator/appBusinessConfig";

const meta: Meta<typeof TripOfferAccept> = {
    component: TripOfferAccept,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof TripOfferAccept> = {
    render: (args) => <TripOfferAccept
        {...args}
        offer={getRandomOffer()}
        trip={getRandomTrip()}
        config={getRandomAppBusinessConfig()}
    />
};