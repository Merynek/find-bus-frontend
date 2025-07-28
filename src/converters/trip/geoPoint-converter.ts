import {GeoPoint as ApiGeoPoint} from "../../api/openapi";
import {GeoPoint} from "../../data/geoPoint";

export class GeoPointConverter {
    public static toInstance(apiGeoPoint: ApiGeoPoint): GeoPoint {
        return new GeoPoint({
            lat: apiGeoPoint.lat,
            lng: apiGeoPoint.lng
        })
    }

    public static toJson(geoPoint: GeoPoint): ApiGeoPoint {
        return {
            lng: geoPoint.lng,
            lat: geoPoint.lat
        }
    }
}