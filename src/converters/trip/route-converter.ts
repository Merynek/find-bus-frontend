import {RouteResponseDto, RouteRequestDto} from "../../api/openapi";
import { Direction } from "../../data/trip/direction";
import {Route} from "../../data/trip/route";
import {DirectionConverter} from "./direction-converter";
import {StopConverter} from "./stop-converter";

export class RouteConverter {
    public static toClient(apiRoute: RouteResponseDto): Route {
        return new Route({
            from: StopConverter.toClient(apiRoute.from),
            to: StopConverter.toClient(apiRoute.to),
            trip: null,
            end: apiRoute.end,
            start: apiRoute.start,
            direction: new Direction({})
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
}