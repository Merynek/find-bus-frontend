import {getRandomPlace} from "./places/place";
import {Stop} from "../src/data/trip/stop";

export function getRandomStop(): Stop {
    return new Stop({
        place: getRandomPlace(),
        route: null
    })
}