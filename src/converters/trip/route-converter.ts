import {RouteResponseDto, RouteRequestDto} from "../../api/openapi";
import {Route} from "../../data/trip/route";
import {DirectionConverter} from "./direction-converter";
import {StopConverter} from "./stop-converter";

export class RouteConverter {
    public static toInstance(apiRoute: RouteResponseDto): Route {
        return new Route({
            from: StopConverter.toInstance(apiRoute.from),
            to: StopConverter.toInstance(apiRoute.to),
            trip: null,
            end: apiRoute.end,
            start: apiRoute.start,
            direction: DirectionConverter.toInstance(apiRoute.direction)
        })
    }

    public static toServer(route: Route): RouteRequestDto {
        return {
            start: route.start,
            from: StopConverter.toServer(route.from),
            to: StopConverter.toServer(route.to),
            end: route.endTime,
            direction: DirectionConverter.toServer(route.direction)
        }
    }

    public static toJson(route: Route): RouteRequestDto {
        return {
            start: route.start,
            from: StopConverter.toServer(route.from),
            to: StopConverter.toServer(route.to),
            end: route.endTime,
            direction: DirectionConverter.toServer(route.direction)
        }
    }
}