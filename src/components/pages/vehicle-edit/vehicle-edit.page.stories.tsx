import React from "react";
import VehicleEditPage from "./vehicle-edit.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomVehicle} from "@/dataGenerator/vehicle";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";

const meta: Meta<typeof VehicleEditPage> = {
    component: VehicleEditPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof VehicleEditPage> = {
    render: (args) => <VehicleEditPage
        {...args}
        vehicle={VehicleConverter.toJson(getRandomVehicle())}
    />
};