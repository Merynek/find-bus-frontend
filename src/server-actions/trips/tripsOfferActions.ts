'use server';

import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {
    IAcceptOfferRequest,
    ICreateOfferRequest, IDeleteOfferRequest,
    IDownloadDocumentRequest,
    IUpdateOfferRequest,
    TripsOfferApi
} from "@/src/api/tripsOfferApi";
import {
    CloseTripOfferReason,
    TripOfferMovementsResponseDto,
    TripOfferResponseDto
} from "@/src/api/openapi";
import {handleActionCall} from "@/src/server-actions/baseAction";

export async function getTripOffers(tripId: number): Promise<TripOfferResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.getTripOffers({
            tripId
        });
    });
}

export async function getOfferStateMovements(tripId: number): Promise<TripOfferMovementsResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.offerStateMovements({
            tripId
        });
    });
}

export async function payedOffer(offerId: number) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.payedOffer({
            offerId: offerId
        });
    });
}

export async function startTrip(tripId: number) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.startTrip({
            tripId: tripId
        });
    });
}

export async function finishTrip(tripId: number) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.finishTrip({
            tripId: tripId
        });
    });
}

export async function forceCloseTrip(tripId: number, reason: CloseTripOfferReason, reasonText: string) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.forceCloseTrip({
            tripId: tripId,
            reason: reason,
            reasonText: reasonText
        });
    });
}

export async function deleteOffer(req: IDeleteOfferRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.deleteOffer(req);
    });
}

export async function acceptOffer(req: IAcceptOfferRequest) {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.acceptOffer(req);
    });
}

export async function updateOffer(req: IUpdateOfferRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.updateOffer(req);
    });
}

export async function createOffer(req: ICreateOfferRequest) {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.createOffer(req);
    });
}

export async function downloadFinancialDocument(req: IDownloadDocumentRequest): Promise<Blob> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.downloadFinancialDocument({
            documentId: req.documentId,
            type: req.type
        });
    });
}