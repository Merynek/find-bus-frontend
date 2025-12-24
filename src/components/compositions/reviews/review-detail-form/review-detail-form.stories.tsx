import {getRandomDetailReview} from "@/dataGenerator/review";
import {ReviewDetailForm} from "@/src/components/compositions/reviews/review-detail-form/review-detail-form";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ReviewDetailForm> = {
    component: ReviewDetailForm,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof ReviewDetailForm> = {
    render: () => {
        return <ReviewDetailForm
            detailReview={getRandomDetailReview()}
        />
    },
    args: {}
};