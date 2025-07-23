'use server';

import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {ICreateOfferRequest, IDownloadDocumentRequest, TripsOfferApi} from "@/src/api/tripsOfferApi";
import {
    CloseTripOfferReason,
    TripOfferAcceptMethod,
    TripOfferMovementsResponseDto,
    TripOfferResponseDto
} from "@/src/api/openapi";

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

export async function acceptOffer(offerId: number, acceptMethod: TripOfferAcceptMethod) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);
    return await tripsOfferApi.acceptOffer({
        offerId: offerId,
        acceptMethod: acceptMethod
    });
}

export async function updateOffer(offerId: number, endOfferDate: Date) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);

    return await tripsOfferApi.updateOffer({
        offerId: offerId,
        endOfferDate: endOfferDate
    });
}

export async function createOffer(req: ICreateOfferRequest) {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);

    return await tripsOfferApi.createOffer(req);
}

export async function downloadFinancialDocument(req: IDownloadDocumentRequest): Promise<Response> {
    const accessToken = await getAccessToken();
    const tripsOfferApi = new TripsOfferApi(accessToken);

    try {
        const blob = await tripsOfferApi.downloadFinancialDocument({
            documentId: req.documentId,
            type: req.type
        });

        const headers = new Headers();
        headers.set('Content-Type', blob.type);
        headers.set('Content-Disposition', `attachment; filename="document_${req.documentId}.${blob.type.split('/')[1] || 'bin'}"`);

        return new Response(blob, { headers });
    } catch (error) {
        console.error('Chyba při stahování dokumentu:', error);
        // Zpracujte chyby, např. vraťte status 500
        return new Response('Chyba při stahování dokumentu', { status: 500 });
    }
}