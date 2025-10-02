import React from "react";
import VehiclePage from "./vehicles.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {VehicleConverter} from "@/src/converters/vehicle-converter";
import {getRandomVehicle} from "@/dataGenerator/vehicle";

const meta: Meta<typeof VehiclePage> = {
    component: VehiclePage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof VehiclePage> = {
    render: (args) => <VehiclePage
        {...args}
        vehicles={[getRandomVehicle(), getRandomVehicle()].map(VehicleConverter.toJson)}
    />
};