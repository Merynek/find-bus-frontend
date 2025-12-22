import {Review} from "@/src/data/review/review";
import {TripInfo} from "@/src/data/trip/tripInfo";

interface ITripReview {
    userReview: Review;
    platformReview: Review;
    trip: TripInfo;
}

export class TripReview {
    public userReview: Review;
    public platformReview: Review;
    public trip: TripInfo;

    constructor(data: ITripReview) {
        this.userReview = data.userReview;
        this.platformReview = data.platformReview;
        this.trip = data.trip;
    }
}