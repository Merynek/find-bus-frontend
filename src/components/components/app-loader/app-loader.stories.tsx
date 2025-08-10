import React from "react";
import {AppLoader} from "./app-loader";
import {FlexGap} from "@/src/enums/layout.enum";
import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof AppLoader> = {
    component: AppLoader,
    args: {
        gap: FlexGap.TINY_8
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AppLoader> = {
    render: () => <AppLoader />,
    parameters: {
        layout: 'fullscreen'
    }
};