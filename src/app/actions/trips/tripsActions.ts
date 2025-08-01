'use server';

import {
    CreateTripRequestDto,
    TripItemResponseDto,
    TripRecommendationRequestDto,
    TripResponseDto
} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {IGetTripsRequest, TripApi} from "@/src/api/tripApi";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";
import {LOCALES} from "@/src/utils/locale";

export async function getTrip(id: number, locale: LOCALES): Promise<TripResponseDto> {
    const accessToken = await getAccessToken();
    const tripApi = new TripApi(accessToken);

    try {
        return await tripApi.getTrip({
            id
        })
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, locale);
    }
}

export async function getTrips(req: IGetTripsRequest, locale: LOCALES): Promise<TripItemResponseDto[]> {
    const accessToken = await getAccessToken();
    const tripApi = new TripApi(accessToken);

    try {
        return await tripApi.getTrips(req);
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, locale);
    }
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