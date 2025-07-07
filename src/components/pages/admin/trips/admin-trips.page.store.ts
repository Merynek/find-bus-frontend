import {autowired} from "ironbean";
import {makeObservable, observable} from "mobx";
import {TripApi} from "@/src/api/tripApi";
import {TripItem} from "@/src/data/tripItem";

interface IAdminTripsPageStore {
}

export class AdminTripsPageStore {
    @autowired private _tripApi: TripApi;
    @observable public trips: TripItem[];

    constructor(settings: IAdminTripsPageStore) {
        this.trips = [];
        makeObservable(this);
    }

    public async loadData() {
        this.trips = await this._tripApi.getTrips({
            offset: 0,
            limit: 200
        })
    }
}