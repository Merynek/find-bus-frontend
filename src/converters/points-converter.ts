import {GeoPoint} from "../data/geoPoint";
import {GeoPoint as ApiGeoPoint} from "../api/openapi";

export class PointsConverter {
    public static toClient(point: ApiGeoPoint): GeoPoint {
        return new GeoPoint({
            lng: point.lng,
            lat: point.lat
        })
    }

    public static toServer(point: GeoPoint): ApiGeoPoint {
        return {
            lat: point.lat,
            lng: point.lng
        }
    }
}