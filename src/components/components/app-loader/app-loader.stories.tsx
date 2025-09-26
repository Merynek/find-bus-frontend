import React from "react";
import {AppLoader} from "./app-loader";
import type {Meta, StoryObj} from "@storybook/nextjs";
import {useMount, useUnmount} from "@/src/hooks/lifecycleHooks";
import {useApp} from "@/src/context/AppContext";

const meta: Meta<typeof AppLoader> = {
    component: AppLoader,
    args: {
    },
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AppLoader> = {
    render: () => {
        const {showLoader, hideLoader} = useApp();
        useMount(() => {
            showLoader();
        })
        useUnmount(() => {
            hideLoader();
        })

        return <AppLoader />
    },
    parameters: {
        layout: 'fullscreen'
    }
};