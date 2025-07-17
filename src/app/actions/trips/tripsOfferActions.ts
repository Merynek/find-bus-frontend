'use server';

import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import type {CloseTripOfferReason, TripOfferMovementsResponseDto, TripOfferResponseDto} from "@/src/api/openapi";

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

export async function payedOffer(offerId: number) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.payedOffer({
        offerId: offerId
    });
}

export async function startTrip(tripId: number) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.startTrip({
        tripId: tripId
    });
}

export async function finishTrip(tripId: number) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.finishTrip({
        tripId: tripId
    });
}

export async function forceCloseTrip(tripId: number, reason: CloseTripOfferReason, reasonText: string) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.forceCloseTrip({
        tripId: tripId,
        reason: reason,
        reasonText: reasonText
    });
}

export async function deleteOffer(tripId: number) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.deleteOffer({
        tripId: tripId
    });
}