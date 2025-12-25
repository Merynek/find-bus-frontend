import type {
    ReviewRequestDto,
    ReviewResponseDto
} from "@/src/api/openapi";
import {Review} from "@/src/data/review/review";
import {DetailReviewConverter} from "@/src/converters/review/detail-review-converter";

export class ReviewConverter {
    public static toInstance(response: ReviewResponseDto): Review {
        return new Review({
            id: response.id,
            visibility: response.visibility,
            comment: response.comment,
            overallRating: response.overallRating,
            targetType: response.targetType,
            moderation: response.moderation,
            details:response.details.map(DetailReviewConverter.toInstance)
        })
    }

    public static toJson(review: Review): ReviewResponseDto {
        return {
            id: review.id,
            comment: review.comment,
            overallRating: review.overallRating,
            targetType: review.targetType,
            visibility: review.visibility,
            moderation: review.moderation,
            details: review.details.map(DetailReviewConverter.toJson)
        }
    }

    public static toServer(review: Review): ReviewRequestDto {
        return {
            comment: review.comment,
            overallRating: review.overallRating,
            details: review.details.map(DetailReviewConverter.toServer)
        }
    }
}