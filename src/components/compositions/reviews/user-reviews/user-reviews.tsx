import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";
import {OverallReviewForm} from "@/src/components/compositions/reviews/overall-review/overall-review-form";
import {useMount} from "@/src/hooks/lifecycleHooks";
import {ReviewService} from "@/src/services/ReviewService";
import {Review} from "@/src/data/review/review";
import { useState } from "react";

interface IUserReviewsProps {
    userId: number;
}

export const UserReviews = (props: IUserReviewsProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    const init = async () => {
        const _userReviews = await ReviewService.getUserTripReviews({userId: props.userId});
        setReviews(_userReviews);
    }

    useMount(() => {
        init();
    })

    return reviews.length > 0 ? <LayoutFlexColumn>
        <Text text={"Reviews"} fontSize={FontSize.BASE_14} />
        {reviews.map(r => {
            return <OverallReviewForm
                key={r.id}
                review={r}
                readonly={true}
            />
        })}
    </LayoutFlexColumn> : null;
}