'use server';

import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import type {TripOfferMovementsResponseDto, TripOfferResponseDto} from "@/src/api/openapi";

export async function getTripOffers(tripId: number): Promise<TripOfferResponseDto[]> {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.getTripOffers({
        tripId
    });
}

export async function getOfferStateMovements(tripId: number): Promise<TripOfferMovementsResponseDto[]> {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.offerStateMovements({
        tripId
    });
}

