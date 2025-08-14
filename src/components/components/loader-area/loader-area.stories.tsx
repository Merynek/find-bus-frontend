import React from "react";
import {LoaderArea, ILoaderAreaProps} from "./loader-area";
import {Meta, StoryObj} from "@storybook/nextjs";

export default {
    component: LoaderArea,
    args: {
        withOffset: true
    }
} as Meta<ILoaderAreaProps>;

export const LoaderAreaStory: StoryObj<ILoaderAreaProps> = {
    render: (args) => <LoaderArea {...args} />,
    args: {}
};