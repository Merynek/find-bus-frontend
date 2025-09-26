'use server';

import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {ICreateOfferRequest, IDownloadDocumentRequest, TripsOfferApi} from "@/src/api/tripsOfferApi";
import {
    CloseTripOfferReason,
    TripOfferAcceptMethod,
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

export async function deleteOffer(tripId: number) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.deleteOffer({
            tripId: tripId
        });
    });
}

export async function acceptOffer(offerId: number, acceptMethod: TripOfferAcceptMethod) {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.acceptOffer({
            offerId: offerId,
            acceptMethod: acceptMethod
        });
    });
}

export async function updateOffer(offerId: number, endOfferDate: Date) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.updateOffer({
            offerId: offerId,
            endOfferDate: endOfferDate
        });
    });
}

export async function createOffer(req: ICreateOfferRequest) {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        return await tripsOfferApi.createOffer(req);
    });
}

export async function downloadFinancialDocument(req: IDownloadDocumentRequest): Promise<Response> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const tripsOfferApi = new TripsOfferApi(accessToken);
        const blob = await tripsOfferApi.downloadFinancialDocument({
            documentId: req.documentId,
            type: req.type
        });

        const headers = new Headers();
        headers.set('Content-Type', blob.type);
        headers.set('Content-Disposition', `attachment; filename="document_${req.documentId}.${blob.type.split('/')[1] || 'bin'}"`);

        return new Response(blob, { headers });
    });
}