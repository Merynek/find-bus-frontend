'use client'

import React from "react";
import {TripReviewDataResponseDto} from "@/src/api/openapi";
import {TripReviewDataConverter} from "@/src/converters/review/trip-review-data-converter";
import {OverallReviewForm} from "@/src/components/compositions/reviews/overall-review/overall-review-form";
import {Text} from "@/src/components/components/texts/text";
import {FontSize} from "@/src/components/components/texts/textStyles";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {TripReview} from "@/src/data/review/trip-review";
import {TripInfoView} from "@/src/components/compositions/trip/trip-info-view/trip-info-view";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {ReviewConverter} from "@/src/converters/review/review-converter";
import {useApp} from "@/src/context/AppContext";
import {getApiErrorMessage} from "@/src/utils/handleApiErrors";
import {ReviewService} from "@/src/services/ReviewService";

interface IReviewPageProps {
    token: string;
    data: TripReviewDataResponseDto|null;
}

export const ReviewPage = (props: IReviewPageProps) => {
    const {token} = props;
    const {showLoader, hideLoader} = useApp();
    const reviewData = props.data ? TripReviewDataConverter.toInstance(props.data) : null;

    const renderReviewForm = (data: TripReview) => {
        return <LayoutFlexColumn gap={FlexGap.SMALL_16}>
            <TripInfoView tripInfo={data.trip} />
            <OverallReviewForm
                review={data.userReview}
            />
            <OverallReviewForm
                review={data.platformReview}
            />
            <ButtonClick
                controlled={true}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
                label={"Submit review"}
                onClick={async () => {
                    showLoader();
                    try {
                        await ReviewService.submitTripReview({
                            review: {
                                userReview: ReviewConverter.toServer(data.userReview),
                                platformReview: ReviewConverter.toServer(data.platformReview),
                                token: token
                            }
                        })
                    } catch (e) {
                        alert(getApiErrorMessage(e));
                    }
                    hideLoader();
                }}
            />
        </LayoutFlexColumn>;
    }

    return reviewData ? renderReviewForm(reviewData): <Text
        text={"Review nenalezeno nebo již bylo vyplněno"}
        fontSize={FontSize.L_32}
    />
};