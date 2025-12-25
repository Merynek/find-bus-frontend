import React from "react";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {TripReview} from "@/src/data/review/trip-review";
import {TripInfoView} from "@/src/components/compositions/trip/trip-info-view/trip-info-view";
import {AdminReviewItem} from "@/src/components/compositions/reviews/admin-review-item/admin-review-item";
import {ReviewConverter} from "@/src/converters/review/review-converter";

interface IAdminReviewsPageProps {
    reviews: TripReview[];
}

const AdminReviewsPage = (props: IAdminReviewsPageProps) => {
    const {reviews} = props;

    const renderReview = (data: TripReview, index: number) => {
        return <LayoutFlexColumn gap={FlexGap.SMALL_16} key={index} style={{border: "2px solid orange"}}>
            <TripInfoView tripInfo={data.trip} />
            <AdminReviewItem review={ReviewConverter.toJson(data.userReview)} />
            <AdminReviewItem review={ReviewConverter.toJson(data.platformReview)} />
        </LayoutFlexColumn>;
    }

    return <div>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            {reviews.map((r, i) => renderReview(r, i))}
        </LayoutFlexColumn>
    </div>
};

export default AdminReviewsPage;