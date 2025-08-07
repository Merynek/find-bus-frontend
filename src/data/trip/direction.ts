import {action, makeObservable, observable, runInAction} from "mobx";

export class IDirectionData {
    polyline?: string;
    distance?: number;
    timeInSeconds?: number;
}

export class Direction {
    @observable private _polyline: string;
    @observable private _distance: number;
    @observable private _timeInSeconds: number;

    constructor(settings: IDirectionData) {
        this._polyline = settings.polyline || "";
        this._distance = settings.distance || 0;
        this._timeInSeconds = settings.timeInSeconds || 0;
        makeObservable(this);
    }

    @action
    public setData(data: IDirectionData) {
        this._polyline = data.polyline || "";
        this._distance = data.distance || 0;
        this._timeInSeconds = data.timeInSeconds || 0
    }

    get timeInSeconds(): number {
        return this._timeInSeconds;
    }

    set timeInSeconds(value: number) {
        this._timeInSeconds = value;
    }

    get distance(): number {
        return this._distance;
    }

    set distance(value: number) {
        this._distance = value;
    }

    get polyline(): string {
        return this._polyline;
    }

    set polyline(value: string) {
        runInAction(() => {
            this._polyline = value;
        })
    }
}