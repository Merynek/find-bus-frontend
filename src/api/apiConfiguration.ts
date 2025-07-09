import {AppConfiguration} from "../singletons/AppConfiguration";
import {Configuration as OpenApiConfiguration } from "./openapi";

export class ApiConfiguration {

    public static createOpenApiConfig(accessToken: string|undefined): OpenApiConfiguration {
        return new OpenApiConfiguration({
            basePath: AppConfiguration.instance.getApiUrl(),
            accessToken: accessToken
        });
    }
}