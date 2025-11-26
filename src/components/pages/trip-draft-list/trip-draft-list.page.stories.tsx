import React from "react";
import TripDraftListPage from "./trip-draft-list.page";
import {type Meta, StoryObj} from "@storybook/nextjs";
import {getRandomTripItem} from "@/dataGenerator/trip";

const meta: Meta<typeof TripDraftListPage> = {
    component: TripDraftListPage,
    args: {
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof TripDraftListPage> = {
    render: (args) => {

        return <TripDraftListPage
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