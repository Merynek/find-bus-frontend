import {component} from "ironbean";
import {makeObservable, observable, runInAction} from "mobx";

@component
export class AppManager {
    @observable public loading: boolean;
    @observable private _sheetOpened: boolean;
    public mapboxAccessToken: string = "pk.eyJ1IjoibWVyeXN5c2VsIiwiYSI6ImNsaWs4bWZhejBmdGgzZGtkbXd5bTRuYngifQ.x_UjkB37ihXIrHinZxcm4w";

    constructor() {
        this.loading = false;
        makeObservable(this);
    }

    get sheetOpened(): boolean {
        return this._sheetOpened;
    }

    set sheetOpened(value: boolean) {
        runInAction(() => {
            this._sheetOpened = value;
        })
    }
}