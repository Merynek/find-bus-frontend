import {autowired} from "ironbean";
import {AdminApi} from "@/src/api/adminApi";
import {Configuration} from "@/src/singletons/configuration";

interface IAppConfigPageStoreParams {
}

export class AppConfigPageStore {
    @autowired private _adminApi: AdminApi;
    @autowired private _configuration: Configuration;

    constructor() {

    }

    public postChanges = async () => {
        await this._adminApi.changeAppBusinessConfig({
            cfg: this._configuration.appBusinessConfig
        })
    }
}