import {autowired} from "ironbean";
import {makeObservable, observable} from "mobx";
import {Vehicle} from "@/src/data/users/vehicle";
import {VehicleApi} from "@/src/api/vehicleApi";

export class VehiclesPageStore {
    @autowired private _vehicleApi: VehicleApi;
    @observable public vehicles: Vehicle[] = [];

    constructor() {
        makeObservable(this);
        this.load();
    }

    public async load() {
        this.vehicles = await this._vehicleApi.getVehicles({});
    }
}