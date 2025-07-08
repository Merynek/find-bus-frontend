import {autowired, component} from "ironbean";
import {Configuration as AppConfiguration} from "../singletons/configuration";
import {Configuration} from "./openapi";

@component
export class ApiConfiguration {
    @autowired private _appConfiguration: AppConfiguration;
    private _config: Configuration;

    constructor() {
        this._config = new Configuration({
            basePath: this._appConfiguration.getApiUrl()
        });
    }

    get config() {
        return this._config;
    }

    public setAccessToken(token: string) {
        this._config = new Configuration({
            basePath: this._appConfiguration.getApiUrl(),
            accessToken: token
        });
    }
}