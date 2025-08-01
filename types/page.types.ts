import {LOCALES} from "@/src/utils/locale";

export interface PageProps<TParams = Record<string, never>, TSearchParams = Record<string, never>> {
    params: {
        locale: LOCALES;
    } & TParams;
    searchParams?: TSearchParams;
}