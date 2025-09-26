import {LOCALES} from "@/src/enums/locale";

interface PagePropsInterface<TParams = Record<string, never>, TSearchParams = Record<string, never>> {
    params: {
        locale: LOCALES;
    } & TParams;
    searchParams?: TSearchParams;
}

export type PageProps<TParams = Record<string, never>, TSearchParams = Record<string, never>> = {
    params: Promise<PagePropsInterface<TParams, TSearchParams>['params']>;
    searchParams: Promise<PagePropsInterface<TParams, TSearchParams>['searchParams']>;
};