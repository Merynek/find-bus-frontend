'use server';

import {
    CreateTripRequestDto,
    TripItemResponseDto,
    TripRecommendationRequestDto, type TripRecommendationResponseDto,
    TripResponseDto
} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {IGetTripsRequest, TripApi} from "@/src/api/tripApi";
import {handleActionCall} from "@/src/app/actions/baseAction";

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

export async function createTrip(trip: CreateTripRequestDto) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripApi = new TripApi(accessToken);

        return await tripApi.createTrip({
            trip: trip
        })
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