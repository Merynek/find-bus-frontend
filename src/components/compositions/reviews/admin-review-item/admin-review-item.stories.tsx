import {getRandomReview} from "@/dataGenerator/review";
import {AdminReviewItem} from "@/src/components/compositions/reviews/admin-review-item/admin-review-item";

const meta: Meta<typeof AdminReviewItem> = {
    component: AdminReviewItem,
    args: {}
};

export default meta;

export const Default: StoryObj<typeof AdminReviewItem> = {
    render: () => {
        return <AdminReviewItem
            review={getRandomReview()}
        />
    },
    args: {}
};