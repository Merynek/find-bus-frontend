import {autowired} from "ironbean";
import {makeObservable, observable} from "mobx";
import {TripFilterStore} from "../../compositions/trip/trip-filter/trip-filter.store";
import {CurrentUser} from "@/src/singletons/current-user";
import {UserRole} from "@/src/api/openapi";
import {TripItem} from "@/src/data/tripItem";
import {TripService} from "@/src/services/TripService";
import {VehicleService} from "@/src/services/VehicleService";

interface ITripListParams {
    page?: number;
    dietForTransporter?: boolean;
    numberOfPersons?: number;
    onlyMine?: boolean;
    meOffered?: boolean;
    distanceFrom?: number;
    distanceTo?: number;
}

export class TripListPageStore {
    @autowired private _currentUser: CurrentUser;
    @observable public tripItems: TripItem[];
    public filter: TripFilterStore;

    constructor() {
        this.tripItems = [];
        this.filter = new TripFilterStore()
        makeObservable(this);
    }

    public async loadDataFromUrl(params: ITripListParams) {
        this.filter.page = params.page || 1;
        this.filter.dietForTransporter = params.dietForTransporter || false;
        this.filter.maxNumberOfPersons = params.numberOfPersons || 0;
        this.filter.onlyMine = params.onlyMine || false;
        this.filter.meOffered = params.meOffered || false;
        this.filter.distanceFromInKm = params.distanceFrom || 0;
        this.filter.distanceToInKm = params.distanceTo || 0;
        if (this._currentUser.role === UserRole.TRANSPORTER) {
            this._currentUser.vehicles = await VehicleService.getVehicles();
        }
        await this._loadTrips();
    }

    private _loadTrips = async () => {
        this.tripItems = await TripService.getTrips({
            limit: 5,
            offset: (this.filter.page - 1) * 5,
            maxNumberOfPersons: this.filter.maxNumberOfPersons || undefined,
            dietForTransporter: this.filter.dietForTransporter || undefined,
            onlyMine: this.filter.onlyMine || undefined,
            meOffered: this.filter.meOffered || undefined,
            distanceFromInKm: this.filter.distanceFromInKm > 0 ? this.filter.distanceFromInKm : undefined,
            distanceToInKm: this.filter.distanceToInKm > 0 ? this.filter.distanceToInKm : undefined
        });
    }

    public async setPage(next: boolean) {
        if (next) {
            this.filter.page = this.filter.page + 1;
        } else {
            this.filter.page = this.filter.page - 1;
        }
    }
}