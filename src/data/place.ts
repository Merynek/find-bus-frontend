import {computed, makeObservable, observable} from "mobx";
import {GeoPoint} from "./geoPoint";
import {Country} from "../api/openapi";

export interface IPlace {
    placeId?: string;
    point?: GeoPoint;
    name?: string;
    city?: string;
    placeFormatted?: string;
    country?: Country;
}

export class Place {
    @observable public placeId?: string;
    @observable public point?: GeoPoint;
    @observable public name?: string;
    @observable public city?: string;
    @observable public placeFormatted?: string;
    @observable public country?: Country;

    constructor(settings: IPlace) {
        this.placeId = settings.placeId;
        this.point = settings.point || undefined;
        this.name = settings.name;
        this.city = settings.city;
        this.placeFormatted = settings.placeFormatted;
        this.country = settings.country;
        makeObservable(this);
    }

    @computed
    get hasAnyData() {
        return this.placeId !== undefined || this.point !== undefined;
    }

    @computed
    get hasPlace() {
        return this.placeId !== undefined && this.point !== undefined;
    }

    get displayName() {
        return this.name || this.city || "";
    }

    public equals(place: Place): boolean {
        if (this.placeId && place.placeId) {
            return this.placeId === place.placeId;
        }
        if (this.point && place.point) {
            return this.point.equals(place.point);
        }
        return false;
    }

    public clone(): Place {
        return new Place({
            name: this.name,
            city: this.city,
            placeId: this.placeId,
            country: this.country,
            point: this.point,
            placeFormatted: this.placeFormatted
        })
    }

    public static create(): Place {
        return new Place({})
    }
}