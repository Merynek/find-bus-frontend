import {GeoPoint} from "@/src/data/geoPoint";
import {Place} from "@/src/data/place";

export interface IMapMarker {
    placeNumber: number,
    onClick?: () => void,
    position?: GeoPoint,
    key?: string
    place: Place;
}