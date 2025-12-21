import React from "react";
import {Meta, StoryObj} from "@storybook/nextjs";
import {ReviewPage} from "@/src/components/pages/review/review-page";

const meta: Meta<typeof ReviewPage> = {
    component: ReviewPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof ReviewPage> = {
    render: (args) => <ReviewPage
        {...args}
    />,
    args: {}
};
