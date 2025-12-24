import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {TripReview} from "@/src/data/review/trip-review";
import {OverallReviewForm} from "@/src/components/compositions/reviews/overall-review/overall-review-form";
import {TripInfoView} from "@/src/components/compositions/trip/trip-info-view/trip-info-view";

interface IAdminReviewsPageProps {
    reviews: TripReview[];
}

const AdminReviewsPage = (props: IAdminReviewsPageProps) => {
    const {reviews} = props;

    const renderReview = (data: TripReview, index: number) => {
        return <LayoutFlexColumn gap={FlexGap.SMALL_16} key={index}>
            <TripInfoView tripInfo={data.trip} />
            <OverallReviewForm
                review={data.userReview}
                readonly={true}
            />
            <OverallReviewForm
                review={data.platformReview}
                readonly={true}
            />
        </LayoutFlexColumn>;
    }

    return <div>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            {reviews.map((r, i) => renderReview(r, i))}
        </LayoutFlexColumn>
    </div>
};

export default AdminReviewsPage;