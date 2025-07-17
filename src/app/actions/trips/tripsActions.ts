'use server';

import {
    CreateTripRequestDto,
    TripItemResponseDto,
    TripRecommendationRequestDto,
    TripResponseDto
} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {IGetTripsRequest, TripApi} from "@/src/api/tripApi";

export async function getTrip(id: number): Promise<TripResponseDto> {
    const accessToken = await getAccessToken();
    const tripApi = new TripApi(accessToken);

    return await tripApi.getTrip({
        id
    })
}

export async function getTrips(req: IGetTripsRequest): Promise<TripItemResponseDto[]> {
    const accessToken = await getAccessToken();
    const tripApi = new TripApi(accessToken);

    return await tripApi.getTrips(req);
}

export async function createTrip(trip: CreateTripRequestDto) {
    const accessToken = await getAccessToken();
    const tripApi = new TripApi(accessToken);

    return await tripApi.createTrip({
        trip: trip
    })
}

export async function getTripRecommendation(tripRecommendation: TripRecommendationRequestDto) {
    const accessToken = await getAccessToken();
    const tripApi = new TripApi(accessToken);

    return await tripApi.getTripRecommendation({
        trip: tripRecommendation
    })
}