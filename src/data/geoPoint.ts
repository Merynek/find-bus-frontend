import {GeoPoint as ApiGeoPoint} from "@/src/api/openapi";

interface IGeoPoint {
    lat: number;
    lng: number;
}

export class GeoPoint {
    public lat: number;
    public lng: number;

    constructor(settings: IGeoPoint) {
        this.lat = settings.lat;
        this.lng = settings.lng;
    }

    toString() {
        return "(" + this.lng + "," + this.lat + ")";
    }

    equals(point: GeoPoint): boolean {
        return this.toString() === point.toString();
    }

    public toJson(): ApiGeoPoint {
        return {
            lat: this.lat,
            lng: this.lng
        }
    }
}
