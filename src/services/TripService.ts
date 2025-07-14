import {Trip} from "@/src/data/trip/trip";
import {getTrip} from "@/src/app/actions/trips/tripsActions";
import {TripConverter} from "@/src/converters/trip/trip-converter";

export class TripService {
    public static async getTrip(id: number): Promise<Trip> {
        const data = await getTrip(id);
        return TripConverter.toClient(data);
    }
}