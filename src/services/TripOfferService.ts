import {getOfferStateMovements, getTripOffers} from "@/src/app/actions/trips/tripsOfferActions";
import {TripOfferConverter} from "@/src/converters/trip-offer-converter";
import {TripOfferMovement} from "@/src/data/tripOfferMovement";
import {Offer} from "@/src/data/offer";

export class TripOfferService {
    public static async getTripOffers(tripId: number): Promise<Offer[]> {
        const data = await getTripOffers(tripId);

        return data.map(TripOfferConverter.toClient);
    }

    public static async getOfferStateMovements(tripId: number): Promise<TripOfferMovement[]> {
        const data = await getOfferStateMovements(tripId);

        return data.map(TripOfferConverter.offerMovementToClient);
    }
}