'use server';

import {
    TripItemResponseDto,
    TripRecommendationRequestDto, type TripRecommendationResponseDto,
    TripResponseDto, type TripReviewResponseDto
} from "@/src/api/openapi";
import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {
    IGetTripReview,
    IGetTripsRequest,
    IPublishTripRequest,
    ISaveTripRequest,
    ISaveUnauthorizedTripRequest, ISubmitTripReview,
    TripApi
} from "@/src/api/tripApi";
import {handleActionCall} from "@/src/server-actions/baseAction";

export async function getTrip(id: number): Promise<TripResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.getTrip({
            id
        })
    })
}

export async function getTripDraft(id: number): Promise<TripResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.getTripDraft({
            id
        })
    })
}

export async function getTrips(req: IGetTripsRequest): Promise<TripItemResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.getTrips(req);
    })
}

export async function getDraftTrips(): Promise<TripItemResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.getDraftTrip();
    })
}

export async function saveTrip(req: ISaveTripRequest): Promise<number> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.saveTrip(req);
    })
}

export async function saveUnauthorizedTrip(req: ISaveUnauthorizedTripRequest): Promise<number> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.saveUnauthorizedTrip(req);
    })
}

export async function publishTrip(req: IPublishTripRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.publishTrip(req)
    })
}

export async function getTripRecommendation(tripRecommendation: TripRecommendationRequestDto): Promise<TripRecommendationResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);

        return await tripApi.getTripRecommendation({
            trip: tripRecommendation
        })
    })
}

export async function getTripReview(req: IGetTripReview): Promise<TripReviewResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);

        return await tripApi.getTripReview(req)
    })
}

export async function submitTripReview(req: ISubmitTripReview): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);

        return await tripApi.submitTripReview(req)
    })
}
