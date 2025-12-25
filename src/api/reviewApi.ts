import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {handleApiCall, IApiRequest} from "./toolsApi";
import {
    ModerationStatus,
    SubmitReviewRequestDto,
    type TripReviewDataResponseDto,
    TripReviewResponseDto
} from "./openapi";

export interface IGetTripReviewsRequest extends IApiRequest {
    offset: number;
    limit: number;
}

export interface IUpdateTripReviewRequest extends IApiRequest {
    reviewId: number;
    moderation: ModerationStatus;
}

export interface IGetTripReviewForSubmit extends IApiRequest {
    token: string;
}

export interface ISubmitTripReview extends IApiRequest {
    review: SubmitReviewRequestDto;
}

export class ReviewApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.ReviewApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async getTripReviews(req: IGetTripReviewsRequest): Promise<TripReviewDataResponseDto[]> {
        return await handleApiCall(this._api.apiReviewAllReviewsGet({
            limit: req.limit,
            offset: req.offset
        }));
    }

    public async updateTripReview(req: IUpdateTripReviewRequest): Promise<void> {
        return await handleApiCall(this._api.apiReviewUpdateReviewPost({
            updateTripReviewRequestDto: {
                reviewId: req.reviewId,
                moderation: req.moderation
            }
        }));
    }

    public async getTripReviewForSubmit(req: IGetTripReviewForSubmit): Promise<TripReviewResponseDto> {
        return await handleApiCall(this._api.apiReviewTripReviewForSubmitGet({
            token: req.token
        }));
    }

    public async submitTripReview(req: ISubmitTripReview): Promise<void> {
        return await handleApiCall(this._api.apiReviewSubmitReviewPost({
            submitReviewRequestDto: req.review
        }));
    }
}