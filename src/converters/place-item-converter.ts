import {Country, type PlaceItemResponseDto} from "../api/openapi";
import {Place} from "../data/place";

export class PlaceItemConverter {
    public static toInstance(apiPlace: PlaceItemResponseDto): Place {
        return new Place({
            placeId: undefined,
            name: undefined,
            city: apiPlace.city,
            placeFormatted: undefined,
            country: apiPlace.country ? apiPlace.country : undefined,
            point: undefined
        });
    }

    public static toJson(place: Place): PlaceItemResponseDto {
        return {
            city: place.city || "",
            country: place.country || Country.CZ
        }
    }
}