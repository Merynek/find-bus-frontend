import {getRandomEditVehicleStore} from "@/dataGenerator/vehicle";
import React from "react";
import VehicleForm, {IVehicleEditProps} from "./vehicle-edit";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: VehicleForm,
    args: {
    }
} as Meta<IVehicleEditProps>;

export const VehicleEditStory: StoryObj<IVehicleEditProps> = {
    render: (args) => <VehicleForm
        {...args}
        store={getRandomEditVehicleStore()}
    />,
    args: {}
};