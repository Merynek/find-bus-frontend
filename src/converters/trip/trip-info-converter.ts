import {
    type TripBaseInfoItemResponseDto
} from "../../api/openapi";
import {TripInfo} from "@/src/data/trip/tripInfo";

export class TripInfoConverter {
    public static toInstance(apiTrip: TripBaseInfoItemResponseDto): TripInfo {
        return new TripInfo({
            id: apiTrip.id,
            name: apiTrip.name || "",
            numberOfPersons: apiTrip.numberOfPersons == null ? 0 : apiTrip.numberOfPersons,
            totalDistanceInMeters: apiTrip.totalDistanceInMeters,
            created: apiTrip.created
        })
    }

    public static toJson(trip: TripInfo): TripBaseInfoItemResponseDto {
        return {
            id: trip.id,
            name: trip.name,
            numberOfPersons: trip.numberOfPersons,
            totalDistanceInMeters: trip.totalDistanceInMeters,
            created: trip.created
        }
    }
}