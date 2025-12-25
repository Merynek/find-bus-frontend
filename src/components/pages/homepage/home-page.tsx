"use client";

import React from "react"
import "./home.page.module.scss";
import {ReviewResponseDto} from "@/src/api/openapi";
import {ReviewConverter} from "@/src/converters/review/review-converter";
import {Text} from "@/src/components/components/texts/text";
import {OverallReviewForm} from "@/src/components/compositions/reviews/overall-review/overall-review-form";
import {FontSize} from "@/src/components/components/texts/textStyles";

interface IHomePageProps {
    reviews: ReviewResponseDto[];
}

const HomePage = (props: IHomePageProps) => {
    const reviews = props.reviews.map(ReviewConverter.toInstance);

    return <div className={"layout"}>
        <Text text={"Reviews"} fontSize={FontSize.M_24} />
        {reviews.map(r => {
            return <OverallReviewForm
                key={r.id}
                review={r}
            />
        })}
    </div>
};

export default HomePage;