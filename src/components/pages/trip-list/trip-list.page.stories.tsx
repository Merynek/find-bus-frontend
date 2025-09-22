import React from "react";
import TripListPage from "./trip-list.page";
import {type Meta, StoryObj} from "@storybook/nextjs";
import {getRandomTripItem} from "@/dataGenerator/trip";

const meta: Meta<typeof TripListPage> = {
    component: TripListPage,
    args: {
        params: {
            page: 1,
            dietForTransporter: false,
            maxNumberOfPersons: 0,
            onlyMine: false,
            meOffered: false,
            distanceFromInKm: 0,
            distanceToInKm: 0
        }
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof TripListPage> = {
    render: (args) => {

        return <TripListPage
            {...args}
            items={[
                getRandomTripItem(),
                getRandomTripItem(),
                getRandomTripItem()
            ]}
        />
    },
    parameters: {
        layout: 'fullscreen'
    }
};