import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {TripOfferSection} from "./trip-offer-section";
import {getRandomTrip} from "@/dataGenerator/trip";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {getRandomAppBusinessConfig} from "@/dataGenerator/appBusinessConfig";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";

const meta: Meta<typeof TripOfferSection> = {
    component: TripOfferSection,
    args: {
    },
};

export default meta;

export const Default: StoryObj<typeof TripOfferSection> = {
    render: () => <TripOfferSection
        trip={TripConverter.toJson(getRandomTrip())}
        config={AppBusinessConfigConverter.toJson(getRandomAppBusinessConfig())}
    />,
    args: {}
};