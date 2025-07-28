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

export class TripItemConverter {
    public static toClient(apiTrip: TripItemResponseDto): TripItem {
        return new TripItem({
            id: apiTrip.id,
            amenities: apiTrip.amenities,
            dietForTransporter: apiTrip.dietForTransporter,
            numberOfPersons: apiTrip.numberOfPersons,
            routes: apiTrip.routes.map(TripItemConverter._createRoute),
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

    private static _createRoute(route: RouteResponseDto): Route {
        return new Route({
            from: TripItemConverter._createStop(route.from),
            to: TripItemConverter._createStop(route.to),
            trip: null,
            end: route.end,
            start: route.start,
            direction: new Direction({})
        })
    }

    private static _createStop(stop: StopResponseDto): Stop {
        const place = PlaceConverter.toInstance(stop.place);
        return new Stop({
            place: place,
            route: null
        })
    }
}