import {autowired} from "ironbean";
import {TripApi} from "@/src/api/tripApi";
import {makeObservable, observable} from "mobx";
import {Trip} from "@/src/data/trip/trip";

export class TripDetailPageStore {
    @autowired private _tripApi: TripApi;
    @observable public trip: Trip|null;
    private tripId: number;

    constructor(tripId: number) {
        this.trip = null;
        this.tripId = tripId;
        this.loadTrip();
        makeObservable(this);
    }

    public async loadTrip() {
        this.trip = await this._tripApi.getTrip({
            id: this.tripId
        })
    }
}