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
import {BaseService} from "@/src/services/BaseService";

export class TripOfferService extends BaseService {
    public static async getTripOffers(tripId: number): Promise<Offer[]> {
        return await this.handleActionCall(async () => {
            const data = await getTripOffers(tripId);
            return data.map(TripOfferConverter.toInstance);
        });
    }

    public static async getOfferStateMovements(tripId: number): Promise<TripOfferMovement[]> {
        return await this.handleActionCall(async () => {
            const data = await getOfferStateMovements(tripId);
            return data.map(TripOfferConverter.offerMovementToInstance);
        });
    }

    public static async payedOffer(offerId: number) {
        await this.handleActionCall(async () => {
            await payedOffer(offerId);
        });
    }

    public static async startTrip(tripId: number) {
        await this.handleActionCall(async () => {
            await startTrip(tripId);
        });
    }

    public static async finishTrip(tripId: number) {
        await this.handleActionCall(async () => {
            await finishTrip(tripId);
        });
    }

    public static async forceCloseTrip(tripId: number, reason: CloseTripOfferReason, reasonText: string) {
        await this.handleActionCall(async () => {
            await forceCloseTrip(tripId, reason, reasonText);
        });
    }

    public static async deleteOffer(tripId: number) {
        await this.handleActionCall(async () => {
            await deleteOffer(tripId);
        });
    }

    public static async acceptOffer(offerId: number, acceptMethod: TripOfferAcceptMethod) {
        await this.handleActionCall(async () => {
            await acceptOffer(offerId, acceptMethod);
        });
    }

    public static async updateOffer(offerId: number, endOfferDate: Date) {
        await this.handleActionCall(async () => {
            await updateOffer(offerId, endOfferDate);
        });
    }

    public static async createOffer(req: ICreateOfferRequest) {
        await this.handleActionCall(async () => {
            await createOffer(req);
        });
    }

    public static async downloadFinancialDocument(req: IDownloadDocumentRequest) {
        return await this.handleActionCall(async () => {
            return await downloadFinancialDocument(req);
        });
    }
}