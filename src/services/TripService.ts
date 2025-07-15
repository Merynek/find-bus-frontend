import {Trip} from "@/src/data/trip/trip";
import {getTrip, getTrips} from "@/src/app/actions/trips/tripsActions";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {TripItemConverter} from "@/src/converters/trip-item-converter";
import {TripItem} from "@/src/data/tripItem";

export class TripService {
    public static async getTrip(id: number): Promise<Trip> {
        const data = await getTrip(id);
        return TripConverter.toClient(data);
    }

    public static async getTrips(offset: number, limit: number): Promise<TripItem[]> {
        const data = await getTrips(offset, limit);
        return data.map(TripItemConverter.toClient);
    }
}