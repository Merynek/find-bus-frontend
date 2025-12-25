import {getRandomReview} from "@/dataGenerator/review";
import {AdminReviewItem} from "@/src/components/compositions/reviews/admin-review-item/admin-review-item";
import {Meta, StoryObj } from "@storybook/nextjs";
import {ReviewConverter} from "@/src/converters/review/review-converter";

const meta: Meta<typeof AdminReviewItem> = {
    component: AdminReviewItem,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof AdminReviewItem> = {
    render: () => {
        return <AdminReviewItem
            review={ReviewConverter.toJson(getRandomReview())}
        />
    },
    args: {}
};