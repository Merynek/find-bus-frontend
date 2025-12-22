import {
    TripItemResponseDto, RouteItemResponseDto, type StopItemResponseDto
} from "../api/openapi";
import {Stop} from "../data/trip/stop";
import {Route} from "../data/trip/route";
import {TripItem} from "../data/trip/tripItem";
import {Direction} from "../data/trip/direction";
import {PlaceItemConverter} from "@/src/converters/place-item-converter";

export class TripItemConverter {
    public static toInstance(apiTrip: TripItemResponseDto): TripItem {
        return new TripItem({
            id: apiTrip.id,
            name: apiTrip.name || "",
            amenities: apiTrip.amenities || [],
            dietForTransporter: apiTrip.dietForTransporter == null ? undefined : apiTrip.dietForTransporter,
            numberOfPersons: apiTrip.numberOfPersons == null ? undefined : apiTrip.numberOfPersons,
            routes: apiTrip.routes.map(TripItemConverter._routeToInstance),
            orderHasEnded: apiTrip.orderHasEnded,
            alreadyOffered: apiTrip.alreadyOffered,
            isMine: apiTrip.isMine,
            offerState: apiTrip.offerState,
            state: apiTrip.state,
            handicappedUserCount: apiTrip.handicappedUserCount == null ? undefined : apiTrip.handicappedUserCount,
            endOrder: apiTrip.endOrder == null ? undefined : apiTrip.endOrder,
            hasOffers: apiTrip.hasOffers,
            totalDistanceInMeters: apiTrip.totalDistanceInMeters,
            created: apiTrip.created
        })
    }

    public static toJson(item: TripItem): TripItemResponseDto {
        return {
            id: item.id,
            name: item.name,
            amenities: item.amenities,
            dietForTransporter: item.dietForTransporter,
            numberOfPersons: item.numberOfPersons,
            routes: item.routes.map(TripItemConverter._routeToJson),
            orderHasEnded: item.orderHasEnded,
            alreadyOffered: item.alreadyOffered,
            isMine: item.isMine,
            offerState: item.offerState,
            handicappedUserCount: item.handicappedUserCount,
            endOrder: item.endOrder,
            state: item.state,
            hasOffers: item.hasOffers,
            totalDistanceInMeters: item.totalDistanceInMeters,
            created: item.created
        }
    }

    private static _routeToJson(route: Route): RouteItemResponseDto {
        return {
            from: TripItemConverter._stopToJson(route.from),
            to: TripItemConverter._stopToJson(route.to),
            end: route.end,
            start: route.start
        }
    }

    private static _routeToInstance(route: RouteItemResponseDto): Route {
        return new Route({
            from: TripItemConverter._stopToInstance(route.from),
            to: TripItemConverter._stopToInstance(route.to),
            trip: null,
            end: route.end,
            start: route.start,
            direction: new Direction({})
        })
    }

    private static _stopToJson(stop: Stop): StopItemResponseDto {
        const place = PlaceItemConverter.toJson(stop.place);
        return {
            place: place
        }
    }

    private static _stopToInstance(stop: StopItemResponseDto): Stop {
        const place = PlaceItemConverter.toInstance(stop.place);
        return new Stop({
            place: place,
            route: null
        })
    }
}