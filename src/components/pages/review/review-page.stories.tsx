import React from "react";
import {Meta, StoryObj} from "@storybook/nextjs";
import {ReviewPage} from "@/src/components/pages/review/review-page";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {getRandomTripReview} from "@/dataGenerator/review";

const meta: Meta<typeof ReviewPage> = {
    component: ReviewPage,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof ReviewPage> = {
    render: (args) => <ReviewPage
        {...args}
        token={getRandomText(1)}
        data={getRandomTripReview()}
    />,
    args: {}
};
