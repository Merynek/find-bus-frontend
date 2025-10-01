import React from "react";
import VehicleEditPage from "./vehicle-edit.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomVehicle} from "@/dataGenerator/vehicle";

const meta: Meta<typeof VehicleEditPage> = {
    component: VehicleEditPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof VehicleEditPage> = {
    render: (args) => <VehicleEditPage
        {...args}
        vehicle={getRandomVehicle()}
    />
};