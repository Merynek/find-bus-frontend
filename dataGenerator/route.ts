import {Route} from "../src/data/trip/route";
import {getRandomStop} from "./stop";
import {getRandomDate} from "./time";
import {addHours} from "../src/utils/date-time.common";
import {getRandomDirection} from "./direction";

export function getRandomRoute(): Route {
    const start = getRandomDate();
    const end = addHours(start, 10);
    return new Route({
        from: getRandomStop(),
        to: getRandomStop(),
        trip: null,
        start: start,
        end: end,
        direction: getRandomDirection()
    })
}