import {GeoPoint} from "../data/geoPoint";
import {GeoPointDto as ApiGeoPoint} from "../api/openapi";

export class PointsConverter {
    public static toInstance(point: ApiGeoPoint): GeoPoint {
        return new GeoPoint({
            lng: point.lng,
            lat: point.lat
        })
    }

    public static toJson(point: GeoPoint): ApiGeoPoint {
        return {
            lat: point.lat,
            lng: point.lng
        }
    }
}