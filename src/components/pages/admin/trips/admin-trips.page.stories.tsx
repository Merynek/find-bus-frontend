import React from "react";
import AdminTripsPage from "./admin-trips.page";
import {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof AdminTripsPage> = {
    component: AdminTripsPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminTripsPage> = {
    render: (args) => <AdminTripsPage {...args} />,
    parameters: {
        layout: 'fullscreen'
    }
};