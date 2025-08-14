import React from "react";
import {DirectionsMap} from "./directions-map";
import {getRandomDirection} from "@/dataGenerator/direction";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof DirectionsMap> = {
    component: DirectionsMap,
    args: {
        directions: [
            getRandomDirection(),
            getRandomDirection(),
            getRandomDirection()
        ],
        markers: []
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof DirectionsMap > = {
    render: (args) => <DirectionsMap {...args} />
};