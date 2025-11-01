import React from "react";
import AdminTransportRequirementsPage from "./admin-transport-requirements.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomTransportRequirements} from "@/dataGenerator/transportRequirements";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";

const meta: Meta<typeof AdminTransportRequirementsPage> = {
    component: AdminTransportRequirementsPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminTransportRequirementsPage> = {
    render: (args) => <AdminTransportRequirementsPage
        {...args}
        requirements={TransportRequirementsConverter.toJson(getRandomTransportRequirements())}
    />
};