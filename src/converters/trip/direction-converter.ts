import {DirectionResponseDto, DirectionRequestDto} from "../../api/openapi";
import { Direction } from "../../data/trip/direction";

export class DirectionConverter {
    public static toInstance(apiDirection: DirectionResponseDto): Direction {
        return new Direction({
            distance: apiDirection.distance,
            timeInSeconds: apiDirection.time,
            polyline: apiDirection.polyline
        })
    }

    public static toServer(direction: Direction): DirectionRequestDto {
        return {
            time: Math.round(direction.timeInSeconds),
            distance: Math.round(direction.distance),
            polyline: direction.polyline
        }
    }

    public static toJson(direction: Direction): DirectionResponseDto {
        return {
            polyline: direction.polyline,
            distance: direction.distance,
            time: direction.timeInSeconds
        }
    }
}