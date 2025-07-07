import React from "react";
import VehiclePage, {IVehiclePageProps} from "./vehicles.page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: VehiclePage,
    args: {}
} as Meta<IVehiclePageProps>;

export const VehiclePageStory: StoryObj<IVehiclePageProps> = {
    render: (args) => <VehiclePage {...args} />,
    args: {}
};