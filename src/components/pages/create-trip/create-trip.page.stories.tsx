import React from "react";
import CreateTripPage, {ICreateTripPageProps} from "./create-trip-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: CreateTripPage,
    args: {}
} as Meta<ICreateTripPageProps>;

export const CreateTripPageStory: StoryObj<ICreateTripPageProps> = {
    render: (args) => <CreateTripPage {...args} />,
    args: {}
};