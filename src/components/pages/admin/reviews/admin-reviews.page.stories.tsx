import React from "react";
import AdminReviewsPage from "./admin-reviews.page";
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof AdminReviewsPage> = {
    component: AdminReviewsPage,
    args: {},
    argTypes: {}
};

export default meta;

export const Default: StoryObj<typeof AdminReviewsPage> = {
    render: (args) => <AdminReviewsPage {...args} />,
    parameters: {
        layout: 'fullscreen'
    }
};