import {Meta, StoryObj} from "@storybook/nextjs";
import React from "react";
import {MapPicker} from "@/src/components/compositions/map-picker/map-picker";

const meta: Meta<typeof MapPicker> = {
    component: MapPicker,
    args: {
    },
    argTypes: {
    }
};

export default meta;

export const Default: StoryObj<typeof MapPicker> = {
    render: (args) => <MapPicker
        {...args}
        id={"example"}
    />,
    args: {}
};