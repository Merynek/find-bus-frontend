import React from "react";
import VehicleDetailPage from "./vehicle-detail.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomVehicle} from "@/dataGenerator/vehicle";

const meta: Meta<typeof VehicleDetailPage> = {
    component: VehicleDetailPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof VehicleDetailPage> = {
    render: (args) => <VehicleDetailPage
        {...args}
        vehicle={getRandomVehicle()}
    />
};