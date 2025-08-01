import {
    getOfferStateMovements,
    getTripOffers,
    payedOffer,
    startTrip,
    finishTrip,
    forceCloseTrip,
    deleteOffer,
    acceptOffer, updateOffer, createOffer, downloadFinancialDocument
} from "@/src/app/actions/trips/tripsOfferActions";
import {TripOfferConverter} from "@/src/converters/trip-offer-converter";
import {TripOfferMovement} from "@/src/data/tripOfferMovement";
import {Offer} from "@/src/data/offer";
import {CloseTripOfferReason, TripOfferAcceptMethod} from "@/src/api/openapi";
import {ICreateOfferRequest, IDownloadDocumentRequest} from "@/src/api/tripsOfferApi";
import {LOCALES} from "@/src/utils/locale";

export class TripOfferService {
    public static async getTripOffers(tripId: number, locale: LOCALES): Promise<Offer[]> {
        const data = await getTripOffers(tripId, locale);

        return data.map(TripOfferConverter.toInstance);
    }

    public static async getOfferStateMovements(tripId: number, locale: LOCALES): Promise<TripOfferMovement[]> {
        const data = await getOfferStateMovements(tripId, locale);

        return data.map(TripOfferConverter.offerMovementToInstance);
    }

    public static async payedOffer(offerId: number) {
        await payedOffer(offerId);
    }

    public static async startTrip(tripId: number) {
        await startTrip(tripId);
    }

    public static async finishTrip(tripId: number) {
        await finishTrip(tripId);
    }

    public static async forceCloseTrip(tripId: number, reason: CloseTripOfferReason, reasonText: string) {
        await forceCloseTrip(tripId, reason, reasonText);
    }

    public static async deleteOffer(tripId: number) {
        await deleteOffer(tripId);
    }

    public static async acceptOffer(offerId: number, acceptMethod: TripOfferAcceptMethod) {
        await acceptOffer(offerId, acceptMethod);
    }

    public static async updateOffer(offerId: number, endOfferDate: Date) {
        await updateOffer(offerId, endOfferDate);
    }

    public static async createOffer(req: ICreateOfferRequest) {
        await createOffer(req);
    }

    public static async downloadFinancialDocument(req: IDownloadDocumentRequest) {
        return await downloadFinancialDocument(req);
    }
}