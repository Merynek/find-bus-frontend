import {Direction} from "../data/trip/direction";
import {DirectionRequestDto, DirectionResponseDto} from "../api/openapi";

export class DirectionsConverter {
    public static toServer(direction: Direction): DirectionRequestDto {
        return {
            time: direction.timeInSeconds,
            distance: direction.distance,
            polyline: direction.polyline
        }
    }

    public static toClient(apiDirection: DirectionResponseDto): Direction {
        return new Direction({
            distance: apiDirection.distance,
            polyline: apiDirection.polyline,
            timeInSeconds: apiDirection.time
        });
    }
}