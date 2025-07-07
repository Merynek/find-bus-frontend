import React from "react";
import {AppLoader} from "./app-loader";
import {Meta, StoryObj} from "@storybook/react";
import {FlexGap} from "@/src/enums/layout.enum";

const meta: Meta<typeof AppLoader> = {
    component: AppLoader,
    args: {
        gap: FlexGap.TINY_8
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AppLoader> = {
    render: (args) => <AppLoader {...args} />,
    parameters: {
        layout: 'fullscreen'
    }
};