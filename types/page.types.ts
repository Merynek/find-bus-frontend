import {LOCALES} from "@/src/utils/locale";

export interface BasePageProps {
    params: {
        locale: LOCALES;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}