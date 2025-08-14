import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {IModalVehicleDetailProps, VehicleDetailModal} from "./vehicle-detail-modal";
import {getRandomVehicle} from "@/dataGenerator/vehicle";

export default {
    component: VehicleDetailModal,
    args: {
    }
} as Meta<IModalVehicleDetailProps>;

export const VehicleDetailModalStory: StoryObj<IModalVehicleDetailProps> = {
    render: (args) => <VehicleDetailModal
        {...args}
        vehicle={getRandomVehicle()}
    />,
    args: {}
};