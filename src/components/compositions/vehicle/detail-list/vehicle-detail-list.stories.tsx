import React from "react";
import {IVehicleDetailListProps, VehicleDetail} from "./vehicle-detail-list";
import {getRandomVehicle} from "@/dataGenerator/vehicle";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: VehicleDetail,
    args: {
    }
} as Meta<IVehicleDetailListProps>;

export const VehicleDetailStory: StoryObj<IVehicleDetailListProps> = {
    render: (args) => <VehicleDetail
        {...args}
        vehicle={getRandomVehicle()}
    />,
    args: {}
};