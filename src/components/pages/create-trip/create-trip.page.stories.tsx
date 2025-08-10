import React from "react";
import CreateTripPage from "./create-trip-page";
import {Meta, StoryObj} from "@storybook/react";

export default {
    component: CreateTripPage,
    args: {}
}

export const CreateTripPageStory: StoryObj = {
    render: (args) => <CreateTripPage {...args} />,
    args: {}
};