import {Trip} from "@/src/data/trip/trip";
import {action, computed, IReactionDisposer, makeObservable, observable, reaction} from "mobx";
import {TripRecommendationType} from "@/src/api/openapi";
import {hoursToSeconds} from "@/src/utils/common";
import {addHours} from "@/src/utils/date-time.common";
import moment from "moment";
import {UserSettings} from "@/src/data/users/userSettings";
import {TripService} from "@/src/services/TripService";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {UsersService} from "@/src/services/UsersService";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";

export class CreateTripPageStore {
    public trip: Trip;
    @observable public tripRecommendation: TripRecommendationType|null;
    @observable public reduceRoutesHours: number|null;
    @observable public reduceTimeHours: number|null;
    @observable public placesAreSet: boolean = true;
    @observable public peopleCountIsValid: boolean = true;
    @observable public routesCountIsValid: boolean = true;
    @observable public userSettings: UserSettings|null = null;
    private _directionTimesReactionDisposer: IReactionDisposer|null;
    private _personCountReactionDisposer: IReactionDisposer|null;
    private _routesCountReactionDisposer: IReactionDisposer|null;
    public appBusinessConfig: AppBusinessConfig;

    constructor(cfg: AppBusinessConfig) {
        this.appBusinessConfig = cfg;
        this.tripRecommendation = null;
        this.reduceRoutesHours = null;
        this.reduceTimeHours = null;
        this.trip = Trip.create({});
        this._directionTimesReactionDisposer = null;
        this._personCountReactionDisposer = null;
        this._routesCountReactionDisposer = null;
        makeObservable(this);
    }

    public async init() {
        this.trip.startObservingChanges();
        this._directionTimesReactionDisposer = reaction(() => this.trip.directionTimes + this.trip.pauses, () => {
            this._computeDirectionTimesApi();
            this.placesAreSet = true;
        });
        this._personCountReactionDisposer = reaction(() => this.trip.numberOfPersons, () => {
            this.peopleCountIsValid = true;
        });
        this._routesCountReactionDisposer = reaction(() => this.trip.routes.length, () => {
            this.routesCountIsValid = true;
        });
        this.userSettings = await UsersService.getSettings();
    }

    public destroy() {
        this.trip.destroy();
        if (this._directionTimesReactionDisposer) {
            this._directionTimesReactionDisposer();
        }
        if (this._personCountReactionDisposer) {
            this._personCountReactionDisposer();
        }
        if (this._routesCountReactionDisposer) {
            this._routesCountReactionDisposer();
        }
    }

    private async _computeDirectionTimesApi() {
        const recommendation = await TripService.getTripRecommendation(TripConverter.tripRecommendationToServer(this.trip));
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
        return this.trip.endOrder >= addHours(new Date(), this.appBusinessConfig.minEndOrderFromNowInHours);
    }

    @computed
    get endOrderWithStartTripIsValid() {
        if (this.trip.dateFrom) {
            const start = moment(this.trip.dateFrom);
            const end = moment(this.trip.endOrder);
            const duration = moment.duration(start.diff(end));
            return duration.asHours() >= this.appBusinessConfig.minDiffBetweenStartTripAndEndOrderInHours;
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
        if (this.trip.numberOfPersons && this.trip.numberOfPersons <= 0) {
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

    public async createTrip() {
        try {
            await TripService.createTrip({
                trip: TripConverter.toServer(this.trip)
            });
        } catch (e) {
            throw e;
        }
    }
}