import {Trip} from "@/src/data/trip/trip";
import {createTrip, getTrip, getTripRecommendation, getTrips} from "@/src/app/actions/trips/tripsActions";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {TripItemConverter} from "@/src/converters/trip-item-converter";
import {TripItem} from "@/src/data/tripItem";
import {ICreateTripRequest, IGetTripsRequest} from "@/src/api/tripApi";
import {TripRecommendation} from "@/src/data/tripRecommendation";
import {TripRecommendationRequestDto} from "@/src/api/openapi";
import {LOCALES} from "@/src/utils/locale";

export class TripService {
    public static async getTrip(id: number, locale: LOCALES): Promise<Trip> {
        const data = await getTrip(id, locale);
        return TripConverter.toInstance(data);
    }

    public static async getTrips(req: IGetTripsRequest): Promise<TripItem[]> {
        const data = await getTrips(req);
        return data.map(TripItemConverter.toInstance);
    }

    public static async createTrip(req: ICreateTripRequest): Promise<void> {
        await createTrip(req.trip);
    }

    public static async getTripRecommendation(trip: TripRecommendationRequestDto): Promise<TripRecommendation> {
        const data = await getTripRecommendation(trip);
        return TripConverter.tripRecommendationToInstance(data);
    }
}