import {autowired} from "ironbean";
import {makeObservable, observable} from "mobx";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {IUsersListParams} from "./admin-users.page";
import {UsersApi} from "@/src/api/usersApi";
import {VehicleApi} from "@/src/api/vehicleApi";

export class AdminUsersPageStore {
    @autowired private _usersApi: UsersApi;
    @autowired private _vehicleApi: VehicleApi;
    @observable public users: UserAdminDetail[];
    @observable public page: number = 1;

    constructor() {
        this.users = [];
        makeObservable(this)
    }

    public async loadDataFromUrl(params: IUsersListParams) {
        this.page = params.page || 1;
        this.users = await this._usersApi.getAllUsers({
            limit: 7,
            offset: (this.page - 1) * 7,
        });
    }

    public async setPage(next: boolean) {
        if (next) {
            this.page = this.page + 1;
        } else {
            this.page = this.page - 1;
        }
    }

    public async setVehicleVerification(id: number, verified: boolean) {
        await this._vehicleApi.setVehicleVerification({
            vehicleId: id,
            verified: verified
        });
    }

    public async setUserTransportVerification(id: number, verified: boolean) {
        await this._usersApi.setUserVerification({
            userId: id,
            verified: verified
        });
    }
}