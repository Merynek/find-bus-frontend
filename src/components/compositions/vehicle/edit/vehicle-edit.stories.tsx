import {getRandomEditVehicleStore} from "@/dataGenerator/vehicle";
import React from "react";
import {IVehicleEditProps, VehicleEdit} from "./vehicle-edit";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: VehicleEdit,
    args: {
    }
} as Meta<IVehicleEditProps>;

export const VehicleEditStory: StoryObj<IVehicleEditProps> = {
    render: (args) => <VehicleEdit
        {...args}
        store={getRandomEditVehicleStore()}
    />,
    args: {}
};