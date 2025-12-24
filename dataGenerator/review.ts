import {getRandomNumber} from "@/src/utils/common";
import {getRandomEnum} from "./tools";
import {
    ModerationStatus,
    ReviewCriterionType,
    ReviewTargetType,
    VisibilityStatus
} from "@/src/api/openapi";
import {DetailReview} from "@/src/data/review/detail-review";
import {getRandomText} from "@/dataGenerator/texts/texts";
import {Review} from "@/src/data/review/review";
import {TripReview} from "@/src/data/review/trip-review";
import {getRandomTripInfo} from "@/dataGenerator/trip";

export function getRandomTripReview() {
    const platform = getRandomReview();
    const user = getRandomReview();

    platform.targetType = ReviewTargetType.PLATFORM;
    user.targetType = ReviewTargetType.USER;

    return new TripReview({
        trip: getRandomTripInfo(),
        platformReview: platform,
        userReview: user
    })
}

export function getRandomReview() {
    const details: DetailReview[] = [];
    for (let i = 0; i < getRandomNumber(1, 4); i++) {
        details.push(getRandomDetailReview())
    }

    return new Review({
        comment: getRandomText(5),
        moderation: getRandomEnum(ModerationStatus),
        targetType: getRandomEnum(ReviewTargetType),
        overallRating: getRandomNumber(1, 5),
        visibility: getRandomEnum(VisibilityStatus),
        details: details
    })
}

export function getRandomDetailReview() {
    return new DetailReview({
        comment: getRandomText(5),
        criterion: getRandomEnum(ReviewCriterionType),
        rating: getRandomNumber(1, 5)
    })
}