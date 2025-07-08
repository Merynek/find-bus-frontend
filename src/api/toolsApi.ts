import * as runtime from "./openapi/runtime";

export interface IApiRequest {
    initOverrides?: RequestInit | runtime.InitOverrideFunction;
}