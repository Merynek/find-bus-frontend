import {Trip} from "@/src/data/trip/trip";
import {autowired} from "ironbean";
import {TripApi} from "@/src/api/tripApi";
import {action, computed, makeObservable, observable, reaction} from "mobx";
import {TripRecommendationType} from "@/src/api/openapi";
import {hoursToSeconds} from "@/src/utils/common";
import {AppManager} from "@/src/singletons/app-manager";
import {addHours} from "@/src/utils/date-time.common";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import moment from "moment";
import {UsersApi} from "@/src/api/usersApi";
import {UserSettings} from "@/src/data/users/userSettings";

export class CreateTripPageStore {
    public trip: Trip;
    @autowired private _tripApi: TripApi;
    @observable public tripRecommendation: TripRecommendationType;
    @observable public reduceRoutesHours: number;
    @observable public reduceTimeHours: number;
    @observable public placesAreSet: boolean = true;
    @observable public peopleCountIsValid: boolean = true;
    @observable public routesCountIsValid: boolean = true;
    @autowired private _configuration: AppConfiguration;
    @autowired private _appManager: AppManager;
    @autowired private _usersApi: UsersApi;
    @observable public userSettings: UserSettings|null;

    constructor() {
        this._initStore();
        makeObservable(this);
    }

    private async _initStore() {
        this.trip = Trip.create({
            observeChanges: true
        });
        reaction(() => this.trip.directionTimes + this.trip.pauses, () => {
            this._computeDirectionTimesApi();
            this.placesAreSet = true;
        });
        reaction(() => this.trip.numberOfPersons, () => {
            this.peopleCountIsValid = true;
        });
        reaction(() => this.trip.routes.length, () => {
            this.routesCountIsValid = true;
        });
        this.userSettings = await this._usersApi.getSettings({})
    }

    public destroy() {
        //todo
    }

    private async _computeDirectionTimesApi() {
        const recommendation = await this._tripApi.getTripRecommendation({
            trip: this.trip
        })
        this.tripRecommendation = recommendation.type;
        recommendation.routes.forEach((route, index) => {
            const currentRoute = this.trip.routes[index];
            currentRoute.computedDirectionInSeconds = hoursToSeconds(route.realTimeInHours);
            currentRoute.currentDJ = route.dJInHours;
            currentRoute.currentM = route.mInHours;
        })
        this.reduceTimeHours = recommendation.reduceTimeHours;
        this.reduceRoutesHours = recommendation.reduceRoutesHours;
    }

    @computed
    get endOrderIsValid() {
        return this.trip.endOrder >= addHours(new Date(), this._configuration.appBusinessConfig.minEndOrderFromNowInHours);
    }

    @computed
    get endOrderWithStartTripIsValid() {
        if (this.trip.dateFrom) {
            const start = moment(this.trip.dateFrom);
            const end = moment(this.trip.endOrder);
            const duration = moment.duration(start.diff(end));
            return duration.asHours() >= this._configuration.appBusinessConfig.minDiffBetweenStartTripAndEndOrderInHours;
        }
        return true;
    }

    @action
    public validate() {
        this.trip.routes.forEach(r => {
            if (!r.from.place.hasPlace || !r.to.place.hasPlace) {
                this.placesAreSet = false;
            }
        })
        if (this.trip.numberOfPersons <= 0) {
            this.peopleCountIsValid = false;
        }
        if (this.trip.routes.length === 0) {
            this.routesCountIsValid = false;
        }
    }

    @computed
    get isValid(): boolean {
        return this.trip.isValid && this.placesAreSet && this.peopleCountIsValid && this.peopleCountIsValid &&
            this.routesCountIsValid && this.endOrderIsValid && this.endOrderWithStartTripIsValid && (this.userSettings ? this.userSettings.isValidForCreateInvoice : false);
    }

    @computed
    get displayRecommendation(): boolean {
        return this.trip.isValid;
    }

    @action
    public async createTrip() {
        this._appManager.loading = true;
        try {
            await this._tripApi.createTrip({
                trip: this.trip
            });
        } catch (e) {
            throw e;
        }
        this._appManager.loading = false;
    }
}