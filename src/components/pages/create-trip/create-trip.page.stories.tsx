import React from "react";
import CreateTripPage from "./create-trip-page";
import {Meta, StoryObj} from "@storybook/nextjs";
import {getRandomAppBusinessConfig} from "@/dataGenerator/appBusinessConfig";
import {AppBusinessConfigConverter} from "@/src/converters/admin/app-business-config-converter";

const meta: Meta<typeof CreateTripPage> = {
    component: CreateTripPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof CreateTripPage> = {
    render: (args) => <CreateTripPage
        {...args}
        cfg={AppBusinessConfigConverter.toJson(getRandomAppBusinessConfig())}
    />
};