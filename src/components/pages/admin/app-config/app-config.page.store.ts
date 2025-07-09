import {autowired} from "ironbean";
import {AdminApi} from "@/src/api/adminApi";
import {AppConfiguration} from "@/src/singletons/AppConfiguration";

interface IAppConfigPageStoreParams {
}

export class AppConfigPageStore {
    @autowired private _adminApi: AdminApi;
    @autowired private _configuration: AppConfiguration;

    constructor() {

    }

    public postChanges = async () => {
        await this._adminApi.changeAppBusinessConfig({
            cfg: this._configuration.appBusinessConfig
        })
    }
}