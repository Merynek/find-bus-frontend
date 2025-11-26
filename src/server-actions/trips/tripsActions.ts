'use server';

import {
    SaveTripRequestDto,
    TripItemResponseDto,
    TripRecommendationRequestDto, type TripRecommendationResponseDto,
    TripResponseDto
} from "@/src/api/openapi";
import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {IGetTripsRequest, IPublishTripRequest, TripApi} from "@/src/api/tripApi";
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

export async function saveTrip(trip: SaveTripRequestDto): Promise<number> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);
        return await tripApi.saveTrip({
            trip: trip
        })
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