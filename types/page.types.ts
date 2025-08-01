import {LOCALES} from "@/src/utils/locale";

export interface PageProps<TParams = Record<string, never>> {
    params: {
        locale: LOCALES;
    } & TParams;
    searchParams?: { [key: string]: string | string[] | undefined };
}