import {
    StopResponseDto,
    RouteResponseDto,
    TripItemResponseDto
} from "../api/openapi";
import {PlaceConverter} from "./place-converter";
import {Stop} from "../data/trip/stop";
import {Route} from "../data/trip/route";
import {TripItem} from "../data/tripItem";
import {Direction} from "../data/trip/direction";
import {DirectionConverter} from "@/src/converters/trip/direction-converter";

export class TripItemConverter {
    public static toInstance(apiTrip: TripItemResponseDto): TripItem {
        return new TripItem({
            id: apiTrip.id,
            amenities: apiTrip.amenities,
            dietForTransporter: apiTrip.dietForTransporter,
            numberOfPersons: apiTrip.numberOfPersons,
            routes: apiTrip.routes.map(TripItemConverter._routeToInstance),
            offerHasEnded: apiTrip.offerHasEnded,
            alreadyOffered: apiTrip.alreadyOffered,
            isMine: apiTrip.isMine,
            offerState: apiTrip.offerState,
            handicappedUserCount: apiTrip.handicappedUserCount,
            endOffer: apiTrip.endOffer,
            hasOffers: apiTrip.hasOffers,
            totalDistanceInMeters: apiTrip.totalDistanceInMeters,
            created: apiTrip.created
        })
    }

    public static toJson(item: TripItem): TripItemResponseDto {
        return {
            id: item.id,
            amenities: item.amenities,
            dietForTransporter: item.dietForTransporter,
            numberOfPersons: item.numberOfPersons,
            routes: item.routes.map(TripItemConverter._routeToJson),
            offerHasEnded: item.offerHasEnded,
            alreadyOffered: item.alreadyOffered,
            isMine: item.isMine,
            offerState: item.offerState,
            handicappedUserCount: item.handicappedUserCount,
            endOffer: item.endOffer,
            hasOffers: item.hasOffers,
            totalDistanceInMeters: item.totalDistanceInMeters,
            created: item.created
        }
    }

    private static _routeToJson(route: Route): RouteResponseDto {
        return {
            from: TripItemConverter._stopToJson(route.from),
            to: TripItemConverter._stopToJson(route.to),
            end: route.end,
            start: route.start,
            direction: DirectionConverter.toJson(route.direction)
        }
    }

    private static _routeToInstance(route: RouteResponseDto): Route {
        return new Route({
            from: TripItemConverter._stopToInstance(route.from),
            to: TripItemConverter._stopToInstance(route.to),
            trip: null,
            end: route.end,
            start: route.start,
            direction: new Direction({})
        })
    }

    private static _stopToJson(stop: Stop): StopResponseDto {
        const place = PlaceConverter.toJson(stop.place);
        return {
            place: place
        }
    }

    private static _stopToInstance(stop: StopResponseDto): Stop {
        const place = PlaceConverter.toInstance(stop.place);
        return new Stop({
            place: place,
            route: null
        })
    }
}