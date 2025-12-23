import {
    TripReviewDataResponseDto
} from "@/src/api/openapi";
import {TripReview} from "@/src/data/review/trip-review";
import {TripInfoConverter} from "@/src/converters/trip/trip-info-converter";
import {ReviewConverter} from "@/src/converters/review/review-converter";

export class TripReviewDataConverter {
    public static toInstance(response: TripReviewDataResponseDto): TripReview {
        return new TripReview({
            trip: TripInfoConverter.toInstance(response.trip),
            userReview: ReviewConverter.toInstance(response.userReview),
            platformReview: ReviewConverter.toInstance(response.platformReview)
        })
    }

    public static toJson(tripReview: TripReview): TripReviewDataResponseDto {
        return {
            trip: TripInfoConverter.toJson(tripReview.trip),
            userReview: ReviewConverter.toJson(tripReview.userReview),
            platformReview: ReviewConverter.toJson(tripReview.platformReview)
        }
    }
}