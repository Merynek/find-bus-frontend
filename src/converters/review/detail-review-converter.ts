import {DetailReview} from "@/src/data/review/detail-review";
import type {DetailReviewRequestDto, ReviewDetailResponseDto} from "@/src/api/openapi";

export class DetailReviewConverter {
    public static toInstance(response: ReviewDetailResponseDto): DetailReview {
        return new DetailReview({
            rating: response.rating,
            criterion: response.criterion,
            comment: response.comment
        })
    }

    public static toJson(review: DetailReview): ReviewDetailResponseDto {
        return {
            rating: review.rating,
            criterion: review.criterion,
            comment: review.comment
        }
    }

    public static toServer(review: DetailReview): DetailReviewRequestDto {
        return {
            rating: review.rating,
            criterion: review.criterion,
            comment: review.comment
        }
    }
}