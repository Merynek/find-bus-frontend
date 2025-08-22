import {IFindBusError} from "@/src/errors/FindBusError";
import {CallbackRouteError} from "@auth/core/errors";
import {ApiError} from "@/src/api/apiError";
import {ErrorCode} from "@/src/api/openapi";

export const serializeError = (error: unknown): string => {
    let standardizedError: IFindBusError;
    if (error instanceof CallbackRouteError) {
        if (error.cause?.err instanceof ApiError) {
            const apiError = error.cause.err;
            standardizedError = {
                message: apiError.message,
                errorCode: apiError.errorCode,
                url: apiError.url,
                statusCode: apiError.statusCode,
                name: apiError.name
            };
        } else {
            // Next-Auth
            standardizedError = {
                message: error.message,
                errorCode: ErrorCode.UNKNOWN,
                name: error.name,
                url: "",
                statusCode: 0
            };
        }
    } else if (error instanceof ApiError) {
        standardizedError = {
            message: error.message,
            errorCode: error.errorCode,
            url: error.url,
            statusCode: error.statusCode,
            name: error.name
        };
    } else {
        standardizedError = {
            message: 'An unexpected error occurred.',
            errorCode: ErrorCode.UNKNOWN,
            name: "unknown",
        };
    }
    return JSON.stringify(standardizedError);
}