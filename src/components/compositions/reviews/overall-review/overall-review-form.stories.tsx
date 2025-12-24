import React from "react";
import { Meta, StoryObj } from "@storybook/nextjs";
import {OverallReviewForm} from "@/src/components/compositions/reviews/overall-review/overall-review-form";
import {getRandomReview} from "@/dataGenerator/review";

const meta: Meta<typeof OverallReviewForm> = {
    component: OverallReviewForm,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof OverallReviewForm> = {
    render: () => {
        return <OverallReviewForm
            review={getRandomReview()}
        />
    },
    args: {}
};