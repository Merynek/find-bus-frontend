import {StopRequestDto, StopResponseDto} from "../../api/openapi";
import {Stop} from "../../data/trip/stop";
import {PlaceConverter} from "../place-converter";

export class StopConverter {
    public static toInstance(apiStop: StopResponseDto): Stop {
        return new Stop({
            place: PlaceConverter.toInstance(apiStop.place),
            route: null
        })
    }

    public static toServer(stop: Stop): StopRequestDto {
        return {
            place: PlaceConverter.toServer(stop.place)
        }
    }

    public static toJson(stop: Stop): StopResponseDto {
        return {
            place: PlaceConverter.toServer(stop.place)
        }
    }
}