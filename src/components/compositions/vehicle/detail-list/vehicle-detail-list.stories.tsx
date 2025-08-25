import React from "react";
import {VehicleDetail} from "./vehicle-detail-list";
import {getRandomVehicle} from "@/dataGenerator/vehicle";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof VehicleDetail> = {
    component: VehicleDetail,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof VehicleDetail> = {
    render: (args) => <VehicleDetail
        {...args}
        vehicle={getRandomVehicle()}
    />,
    args: {}
};