import {Locales} from "../api/openapi";
import {LOCALES} from "@/src/enums/locale";

export class LocaleConverter {
    public static toClient(locale: Locales): LOCALES {
        switch (locale) {
            case Locales.CS_CZ:
                return LOCALES.cs_CZ;
            case Locales.EN_US:
                return LOCALES.en_US;
        }
    }

    public static toServer(locale: LOCALES): Locales {
        switch (locale) {
            case LOCALES.cs_CZ:
                return Locales.CS_CZ;
            case LOCALES.en_US:
                return Locales.EN_US;
        }
    }
}