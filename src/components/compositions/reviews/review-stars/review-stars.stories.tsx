import React, {useState} from "react";
import {ReviewStars} from "@/src/components/compositions/reviews/review-stars/review-stars";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ReviewStars> = {
    component: ReviewStars,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof ReviewStars> = {
    render: () => {
        const [rating, setRating] = useState<number>(0);

        return <ReviewStars
            rating={rating}
            onChange={(rat) => {
                setRating(rat);
            }}
        />
    },
    args: {}
};