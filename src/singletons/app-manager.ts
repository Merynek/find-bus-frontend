import {component} from "ironbean";
import {makeObservable, observable} from "mobx";

@component
export class AppManager {
    @observable public loading: boolean;
    public mapboxAccessToken: string;

    constructor() {
        if (process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
            this.mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        } else {
            throw new Error('Environment variable API_URL is not defined.');
        }
        this.loading = false;
        makeObservable(this);
    }
}