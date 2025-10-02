import React from "react";
import VehiclesPage from "./vehicles.page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomVehicle} from "@/dataGenerator/vehicle";

const meta: Meta<typeof VehiclesPage> = {
    component: VehiclesPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof VehiclesPage> = {
    render: (args) => <VehiclesPage
        {...args}
        vehicles={[getRandomVehicle(), getRandomVehicle()]}
    />
};