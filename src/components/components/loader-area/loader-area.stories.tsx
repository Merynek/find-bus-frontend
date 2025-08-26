import React from "react";
import {LoaderArea} from "./loader-area";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof LoaderArea> = {
    component: LoaderArea,
    args: {
        withOffset: true
    }
};

export default meta;

export const Default: StoryObj<typeof LoaderArea>  = {
    render: (args) => {
        return <LoaderArea {...args} />
    }
};
