import React from "react";
import TransportRequirementsPage from "./transport-requirements.page";
import {StoryObj} from "@storybook/nextjs";
import {getRandomTransportRequirements} from "@/dataGenerator/transportRequirements";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";

export default {
    component: TransportRequirementsPage,
    args: {}
};

export const TransportRequirementsStory: StoryObj = {
    render: () => <TransportRequirementsPage
        transportRequirements={TransportRequirementsConverter.toJson(getRandomTransportRequirements())}
    />,
    args: {}
};