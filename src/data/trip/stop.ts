import {Place} from "../place";
import {computed, makeObservable, observable, runInAction} from "mobx";
import {Route} from "./route";
import {StopResponseDto} from "@/src/api/openapi";
import {IdGenerator, IdType} from "@/src/singletons/id-generator";

interface IStop {
    id?: number;
    place: Place;
    route: Route | null;
}

export class Stop {
    public readonly id: number;
    @observable public place: Place;
    @observable private _route: Route | null;

    constructor(settings: IStop) {
        this.place = settings.place;
        this.id = settings.id || IdGenerator.instance.getId(IdType.STOP);
        this._route = settings.route;
        makeObservable(this);
    }

    get route(): Route | null {
        return this._route;
    }

    set route(value: Route | null) {
        runInAction(() => {
            this._route = value;
        })
    }

    @computed
    get nextDirectionStop(): Stop|undefined {
        if (this._route && this._route.trip) {
            return this._route.trip.getNextDirectionStop(this);
        }
        return undefined;
    }

    @computed
    get order(): number|undefined {
        if (this._route && this._route.trip) {
            let stops: Stop[] = [];
            let order = 0;
            let previousStop: Stop|null = null;

            stops = this._route.trip.stops;

            for (let i = 0; i < stops.length; i++) {
                const stop = stops[i];
                if (!previousStop || !stop.place.equals(previousStop.place)) {
                    // don't increase order on same stops
                    order++;
                }
                previousStop = stop;
                if (stop === this) {
                    return order;
                }
            }
        }
        return undefined;
    }
}