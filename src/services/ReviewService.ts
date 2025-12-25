import {BaseService} from "@/src/services/BaseService";
import {TripReview} from "@/src/data/review/trip-review";
import {TripReviewDataConverter} from "@/src/converters/review/trip-review-data-converter";
import {
    IGetTripReviewForSubmit,
    IGetTripReviewsRequest,
    ISubmitTripReview,
    IUpdateTripReviewRequest
} from "@/src/api/reviewApi";
import { updateTripReview, submitTripReview, getTripReviews, getTripReviewForSubmit } from "../server-actions/reviews/reviewActions";

export class ReviewService extends BaseService {

    public static async getTripReviews(req: IGetTripReviewsRequest): Promise<TripReview[]> {
        return await this.handleActionCall(async () => {
            const data = await getTripReviews(req);
            return data.map(TripReviewDataConverter.toInstance)
        });
    }

    public static async updateTripReview(req: IUpdateTripReviewRequest): Promise<void> {
        return await this.handleActionCall(async () => {
            return await updateTripReview(req);
        });
    }

    public static async getTripReviewForSubmit(req: IGetTripReviewForSubmit): Promise<TripReview|null> {
        return await this.handleActionCall(async () => {
            const data = await getTripReviewForSubmit(req);
            return data.result ? TripReviewDataConverter.toInstance(data.result) : null;
        });
    }

    public static async submitTripReview(req: ISubmitTripReview): Promise<void> {
        return await this.handleActionCall(async () => {
            await submitTripReview(req);
        });
    }
}