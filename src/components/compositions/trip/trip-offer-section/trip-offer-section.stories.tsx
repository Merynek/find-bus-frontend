import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TripOfferSection} from "./trip-offer-section";
import {getRandomTrip} from "@/dataGenerator/trip";

const meta: Meta<typeof TripOfferSection> = {
    component: TripOfferSection,
    args: {
    },
};

export default meta;

export const Default: StoryObj<typeof TripOfferSection> = {
    render: (args) => <TripOfferSection
        {...args}
        trip={getRandomTrip()}
    />,
    args: {}
};