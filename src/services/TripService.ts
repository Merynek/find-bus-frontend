import {Trip} from "@/src/data/trip/trip";
import {saveTrip, getDraftTrips, getTrip, getTripRecommendation, getTrips, publishTrip} from "@/src/server-actions/trips/tripsActions";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {TripItemConverter} from "@/src/converters/trip-item-converter";
import {TripItem} from "@/src/data/tripItem";
import {ISaveTripRequest, IGetTripsRequest, IPublishTripRequest} from "@/src/api/tripApi";
import {TripRecommendation} from "@/src/data/tripRecommendation";
import {TripRecommendationRequestDto} from "@/src/api/openapi";
import {BaseService} from "@/src/services/BaseService";

export class TripService extends BaseService {
    public static async getTrip(id: number): Promise<Trip> {
        return await this.handleActionCall(async () => {
            const data = await getTrip(id);
            return TripConverter.toInstance(data);
        });
    }

    public static async getTrips(req: IGetTripsRequest): Promise<TripItem[]> {
        return await this.handleActionCall(async () => {
            const data = await getTrips(req);
            return data.map(TripItemConverter.toInstance);
        });
    }

    public static async getDraftTrips(): Promise<TripItem[]> {
        return await this.handleActionCall(async () => {
            const data = await getDraftTrips();
            return data.map(TripItemConverter.toInstance);
        });
    }

    public static async saveTrip(req: ISaveTripRequest): Promise<number> {
        return await this.handleActionCall(async () => {
            return await saveTrip(req.trip);
        });
    }

    public static async publishTrip(req: IPublishTripRequest): Promise<void> {
        await this.handleActionCall(async () => {
            await publishTrip(req);
        });
    }

    public static async getTripRecommendation(trip: TripRecommendationRequestDto): Promise<TripRecommendation> {
        return await this.handleActionCall(async () => {
            const data = await getTripRecommendation(trip);
            return TripConverter.tripRecommendationToInstance(data);
        });
    }
}