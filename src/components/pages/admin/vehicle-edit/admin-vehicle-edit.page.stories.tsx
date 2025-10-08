import React from "react";
import AdminVehicleEditPage from "./admin-vehicle-edit.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomVehicle} from "@/dataGenerator/vehicle";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";

const meta: Meta<typeof AdminVehicleEditPage> = {
    component: AdminVehicleEditPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminVehicleEditPage> = {
    render: (args) => <AdminVehicleEditPage
        {...args}
        vehicle={VehicleConverter.toJson(getRandomVehicle())}
    />
};