import {autowired} from "ironbean";
import {TripApi} from "@/src/api/tripApi";
import {makeObservable, observable, runInAction} from "mobx";
import {Trip} from "@/src/data/trip/trip";
import {TripsOfferApi} from "@/src/api/tripsOfferApi";
import {Offer} from "@/src/data/offer";
import {TripOfferMovement} from "@/src/data/tripOfferMovement";


interface IAdminTripDetailPageStore {
}

export class AdminTripDetailPageStore {
    @observable private _trip: Trip|null;
    @observable private _offers: Offer[];
    @observable private _movements: TripOfferMovement[];
    @autowired private _tripApi: TripApi;
    @autowired private _tripsOfferApi: TripsOfferApi;

    constructor(settings: IAdminTripDetailPageStore) {
        this.trip = null;
        this._offers = [];
        this._movements = [];
        makeObservable(this);
    }

    public async getTrip(id: number) {
        this._trip = await this._tripApi.getTrip({
            id
        })
    }

    public async loadOffers() {
        if (this._trip) {
            this._offers = await this._tripsOfferApi.getTripOffers({
                tripId: this._trip.id
            })
        }
    }

    public async loadMovements() {
        if (this._trip) {
            this._movements = await this._tripsOfferApi.offerStateMovements({
                tripId: this._trip.id
            })
        }
    }

    get offers() {
        return this._offers;
    }

    set offers(offers: Offer[]) {
        runInAction(() => {
            this._offers = offers;
        })
    }

    get trip() {
        return this._trip;
    }

    set trip(value: Trip|null) {
        runInAction(() => {
            this._trip = value;
        })
    }

    get movements() {
        return this._movements;
    }

    set movements(movements: TripOfferMovement[]) {
        runInAction(() => {
            this._movements = movements;
        })
    }
}