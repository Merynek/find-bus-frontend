import {computed, IReactionDisposer, makeObservable, observable, reaction} from "mobx";
import {Stop} from "./stop";
import {Direction} from "./direction";
import {Trip} from "./trip";
import {milliSecondsToHours, secondsToMilliSeconds} from "../../utils/common";
import {LocationService} from "../../singletons/location-service";
import {Priority} from "../../utils/semaphore";

interface IRoute {
    from: Stop;
    to: Stop;
    trip: Trip|null;
    start: Date;
    end: Date;
    direction: Direction;
}

export class Route {
    private _trip: Trip|null;
    private readonly _direction: Direction;
    @observable public start: Date;
    @observable public end: Date;
    @observable public from: Stop;
    @observable public to: Stop
    @observable public computedDirectionInSeconds: number = 0;
    @observable public currentDJ: number = 0;
    @observable public currentM: number = 0;
    private _polyLineComputeDisposer: IReactionDisposer|null = null;

    constructor(settings: IRoute) {
        this._direction = settings.direction;
        this.from = settings.from;
        this.to = settings.to;
        this._trip = settings.trip || null;
        this.start = settings.start;
        this.end = settings.end;
        this.updateStops();
        makeObservable(this);
    }

    public observePlaceChanges() {
        if (!this._polyLineComputeDisposer) {
            this._polyLineComputeDisposer = reaction(() => this.from.place.point?.toString() + "-" + this.to.place.point?.toString(), async () => {
                this._direction.setData(await LocationService.instance.getDirectionData(this.from.place, this.to.place, Priority.HIGH));
            });
        } else {
            console.warn("This route is already observed");
        }
    }

    public destroy() {
        if (this._polyLineComputeDisposer) {
            this._polyLineComputeDisposer();
        }
    }

    get direction() {
        return this._direction;
    }

    /* computed recommendation getters */
    @computed
    get computedEndTime(): Date {
        return new Date(this.computedDate.getTime() + secondsToMilliSeconds(this.computedDirectionInSeconds));
    }

    @computed
    get computedDate(): Date {
        if (this.previousTripRoute) {
            const previousPauseInHours = milliSecondsToHours(this.previousPauseInMilliSeconds);
            if (previousPauseInHours >= 9) {
                return this.start;
            }
            return new Date(this.previousTripRoute.computedEndTime.getTime() + this.previousPauseInMilliSeconds);
        }
        return this.start;
    }
    /* computed recommendation getters */

    @computed
    get dateTimeIsValid(): boolean {
        const previous = this.previousTripRoute;
        if (previous) {
            return this.start.getTime() >= previous.endTime.getTime();
        }
        return true;
    }

    @computed
    get endTime(): Date {
        return new Date(this.start.getTime() + this.directionTimeMilliSeconds);
    }

    get trip(): Trip|null {
        return this._trip;
    }

    set trip(trip: Trip|null) {
        this._trip = trip;
    }

    @computed
    get index(): number {
        if (this.trip) {
            return this.trip.routes.indexOf(this);
        }
        return -1;
    }

    @computed
    get previousTripRoute(): Route|undefined {
        if (this.trip) {
            const index = this.trip.routes.indexOf(this);
            if (index > 0) {
                return this.trip.routes[index-1];
            }
        }
        return undefined;
    }

    @computed
    get isLast(): boolean {
        if (this.trip) {
            return this.trip.routes.indexOf(this) === this.trip.routes.length - 1;
        }
        return false;
    }

    @computed
    get directionTimeMilliSeconds(): number {
        return secondsToMilliSeconds(this._direction.timeInSeconds);
    }

    @computed
    get previousPauseInMilliSeconds(): number {
        if (this.previousTripRoute) {
            const start = this.start.getTime();
            const previousStart = this.previousTripRoute.start.getTime() + this.previousTripRoute.directionTimeMilliSeconds;
            return Math.abs(start - previousStart);
        }
        return 0;
    }

    @computed
    get minDate(): Date {
        if (this.previousTripRoute) {
            return new Date(this.previousTripRoute.start.getTime() + (this.previousTripRoute.directionTimeMilliSeconds));
        }
        return new Date();
    }

    private updateStops() {
        this.from.route = this;
        this.to.route = this;
    }
}