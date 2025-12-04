import {Country, PlaceRequestDto, PlaceResponseDto} from "../api/openapi";
import {Place} from "../data/place";
import {PointsConverter} from "./points-converter";

export class PlaceConverter {
    public static toInstance(apiPlace: PlaceResponseDto): Place {
        return new Place({
            placeId: apiPlace.placeId,
            name: apiPlace.name,
            city: apiPlace.city,
            placeFormatted: apiPlace.placeFormatted || undefined,
            country: apiPlace.country ? apiPlace.country : undefined,
            point: PointsConverter.toInstance(apiPlace.point)
        });
    }

    public static toServer(place: Place): PlaceRequestDto {
        return {
            placeId: place.placeId || "",
            point: place.point ? PointsConverter.toJson(place.point) : {lat: 0, lng: 0},
            country: place.country || Country.CZ,
            name: place.name || "",
            city: place.city || "",
            placeFormatted: place.placeFormatted || ""
        }
    }

    public static toJson(place: Place): PlaceResponseDto {
        return {
            placeId: place.placeId || "",
            point: place.point ? PointsConverter.toJson(place.point) : {lat: 0, lng: 0},
            name: place.name || "",
            city: place.city || "",
            placeFormatted: place.placeFormatted || "",
            country: place.country || Country.CZ
        }
    }
}