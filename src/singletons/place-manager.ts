import {action, observable} from "mobx";
import {Place} from "../data/place";

export class PlaceManager {
    private static _instance: PlaceManager | null = null;
    @observable public placeIds: Map<string, Place> = new Map<string, Place>();
    @observable public geoPoints: Map<string, Place> = new Map<string, Place>();

    public static get instance(): PlaceManager {
        if (!PlaceManager._instance) {
            PlaceManager._instance = new PlaceManager();
        }
        return PlaceManager._instance;
    }

    public initPlaces(places: Place[]) {
        places.forEach(place => {
            if (place.placeId) {
                this.placeIds.set(place.placeId, place);
            }
            if (place.point) {
                this.geoPoints.set(place.point.toString(), place);
            }
        });
    }

    @action
    public add(place: Place): Place {
        let existsPlace = this.find(place);
        if (existsPlace) {
            return existsPlace;
        }
        this.insertNewPlace(place);
        return place;
    }

    public find(place: Place): Place|undefined {
        let tp: Place|undefined;
        if (place.placeId) {
            tp = this.findByPlaceId(place.placeId);
            if (tp) {
                return tp;
            }
        }
        if (place.point) {
            tp = this.geoPoints.get(place.point.toString())
        }
        return tp;
    }

    public findByPlaceId(placeId: string): Place|undefined {
        return this.placeIds.get(placeId)
    }

    @action
    private insertNewPlace(place: Place) {
        if (place.placeId) {
            this.placeIds.set(place.placeId, place);
        }
        if (place.point) {
            this.geoPoints.set(place.point.toString(), place);
        }
    }
}