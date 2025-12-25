import {handleActionCall} from "@/src/server-actions/baseAction";
import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {
    IGetTripReviewForSubmit,
    IGetTripReviewsRequest, ISubmitTripReview,
    IUpdateTripReviewRequest,
    ReviewApi
} from "@/src/api/reviewApi";
import {TripReviewDataResponseDto, TripReviewResponseDto} from "@/src/api/openapi";

export async function getTripReviews(req: IGetTripReviewsRequest): Promise<TripReviewDataResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const reviewApi = new ReviewApi(accessToken);
        return await reviewApi.getTripReviews(req);
    })
}

export async function updateTripReview(req: IUpdateTripReviewRequest): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const reviewApi = new ReviewApi(accessToken);
        return await reviewApi.updateTripReview(req);
    })
}

export async function getTripReviewForSubmit(req: IGetTripReviewForSubmit): Promise<TripReviewResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const reviewApi = new ReviewApi(accessToken);

        return await reviewApi.getTripReviewForSubmit(req)
    })
}

export async function submitTripReview(req: ISubmitTripReview): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const reviewApi = new ReviewApi(accessToken);

        return await reviewApi.submitTripReview(req)
    })
}