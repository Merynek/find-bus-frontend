import {ROUTES, SEARCH_PARAMS} from "@/src/enums/router.enum";
import { redirect } from "../i18n/navigation";
import {LOCALES} from "@/src/utils/locale";
import {ResponseError} from "@/src/api/openapi";

export function handleApiUnauthorizedError(error: unknown , locale: LOCALES): never {
    if (isUnauthorizedError(error)) {
        const params = {
            [SEARCH_PARAMS.UNAUTHORIZED]: "true"
        };
        redirect({
            locale: locale,
            href: {
                pathname: ROUTES.SIGN_IN,
                query: params
            }
        });
    }
    throw error;
}

export function isUnauthorizedError(error: unknown): boolean {
    if (error instanceof ResponseError) {
        if (error && error.response && error.response.status === 401) {
            return true;
        }
    }
    return false;
}