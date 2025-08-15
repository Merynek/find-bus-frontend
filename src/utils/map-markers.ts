import {Trip} from "../data/trip/trip";
import {Stop} from "../data/trip/stop";
import {IMapMarker} from "../components/components/map-box/map-box-types";

export function getTripMarkers(trip: Trip): IMapMarker[] {
    const markers: IMapMarker[] = [];

    trip.stops.forEach((stop) => {
        markers.push(...getMarkersFromStop(stop));
    });

    return markers;
}

function getMarkersFromStop(stop: Stop) {
    const markers: IMapMarker[] = [];
    const place = stop.place;
    markers.push(
        {
            position: place.point,
            placeNumber: stop.order || 0,
            place: place
        }
    )
    return markers
}