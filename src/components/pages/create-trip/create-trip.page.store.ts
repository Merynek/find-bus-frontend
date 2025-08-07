import {Trip} from "@/src/data/trip/trip";
import {action, computed, makeObservable, observable, reaction} from "mobx";
import {TripRecommendationType} from "@/src/api/openapi";
import {hoursToSeconds} from "@/src/utils/common";
import {addHours} from "@/src/utils/date-time.common";
import moment from "moment";
import {UserSettings} from "@/src/data/users/userSettings";
import {TripService} from "@/src/services/TripService";
import {TripConverter} from "@/src/converters/trip/trip-converter";
import {UsersService} from "@/src/services/UsersService";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";
import {LOCALES} from "@/src/utils/locale";

export class CreateTripPageStore {
    public trip: Trip;
    @observable public tripRecommendation: TripRecommendationType;
    @observable public reduceRoutesHours: number;
    @observable public reduceTimeHours: number;
    @observable public placesAreSet: boolean = true;
    @observable public peopleCountIsValid: boolean = true;
    @observable public routesCountIsValid: boolean = true;
    @observable public userSettings: UserSettings|null = null;

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
    }

    public async init(locales: LOCALES) {
        this.userSettings = await UsersService.getSettings(locales);
    }

    public destroy() {
        //todo
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
        return this.trip.endOrder >= addHours(new Date(), AppConfiguration.instance.appBusinessConfig.minEndOrderFromNowInHours);
    }

    @computed
    get endOrderWithStartTripIsValid() {
        if (this.trip.dateFrom) {
            const start = moment(this.trip.dateFrom);
            const end = moment(this.trip.endOrder);
            const duration = moment.duration(start.diff(end));
            return duration.asHours() >= AppConfiguration.instance.appBusinessConfig.minDiffBetweenStartTripAndEndOrderInHours;
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
        try {
            await TripService.createTrip({
                trip: TripConverter.toServer(this.trip)
            });
        } catch (e) {
            throw e;
        }
    }
}