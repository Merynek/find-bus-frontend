'use client'

import React from "react";
import {useTranslate} from "@/src/hooks/translateHook";
import {TripReviewDataResponseDto} from "@/src/api/openapi";
import {TripReviewDataConverter} from "@/src/converters/review/trip-review-data-converter";

interface IReviewPageProps {
    data: TripReviewDataResponseDto|null;
}

export const ReviewPage = (props: IReviewPageProps) => {
    const reviewData = props.data ? TripReviewDataConverter.toInstance(props.data) : null;
    const {t} = useTranslate("page.review");

    return <div>{"asda"}</div>
};