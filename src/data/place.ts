import {computed, makeObservable, observable} from "mobx";
import {GeoPoint} from "./geoPoint";
import {Country} from "../api/openapi";

export interface IPlace {
    placeId?: string;
    point?: GeoPoint;
    name?: string;
    placeFormatted?: string;
    country?: Country;
}

export class Place {
    @observable public placeId?: string;
    @observable public point?: GeoPoint;
    @observable public name?: string;
    @observable public placeFormatted?: string;
    @observable public country?: Country;

    constructor(settings: IPlace) {
        makeObservable(this);
        this.placeId = settings.placeId;
        this.point = settings.point || undefined;
        this.name = settings.name;
        this.placeFormatted = settings.placeFormatted;
        this.country = settings.country;
    }

    @computed
    get hasAnyData() {
        return this.placeId !== undefined || this.point !== undefined;
    }

    @computed
    get hasPlace() {
        return this.placeId !== undefined && this.point !== undefined;
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