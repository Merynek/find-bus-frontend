import {makeObservable, observable} from "mobx";

export class TripFilterStore {
    @observable private _page: number;
    @observable private _dietForTransporter: boolean;
    @observable private _maxNumberOfPersons: number;
    @observable private _onlyMine: boolean;
    @observable private _meOffered: boolean;
    @observable private _distanceFromInKm: number;
    @observable private _distanceToInKm: number;

    constructor() {
        this._page = 1;
        this._dietForTransporter = false;
        this._maxNumberOfPersons = 0;
        this._onlyMine = false;
        this._meOffered = false;
        this._distanceFromInKm = 0;
        this._distanceToInKm = 0;
        makeObservable(this);
    }

    get dietForTransporter(): boolean {
        return this._dietForTransporter;
    }
    set dietForTransporter(value: boolean) {
        this._dietForTransporter = value;
    }

    get maxNumberOfPersons(): number {
        return this._maxNumberOfPersons;
    }
    set maxNumberOfPersons(value: number) {
        this._maxNumberOfPersons = value <= 0 ? 0 : value;
    }

    get page(): number {
        return this._page;
    }
    set page(value: number) {
        this._page = value <= 1 ? 1 : value;
    }

    get onlyMine(): boolean {
        return this._onlyMine;
    }
    set onlyMine(value: boolean) {
        this._onlyMine = value;
    }

    get meOffered(): boolean {
        return this._meOffered;
    }
    set meOffered(value: boolean) {
        this._meOffered = value;
    }
    get distanceToInKm(): number {
        return this._distanceToInKm;
    }

    set distanceToInKm(value: number) {
        this._distanceToInKm = value <= 0 ? 0 : value;
    }
    get distanceFromInKm(): number {
        return this._distanceFromInKm;
    }

    set distanceFromInKm(value: number) {
        this._distanceFromInKm = value <= 0 ? 0 : value;
    }
}