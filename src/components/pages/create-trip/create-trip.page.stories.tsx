import React from "react";
import CreateTripPage from "./create-trip-page";
import {StoryObj} from "@storybook/nextjs";

export default {
    component: CreateTripPage,
    args: {}
}

export const CreateTripPageStory: StoryObj = {
    render: (args) => <CreateTripPage {...args} />,
    args: {}
};