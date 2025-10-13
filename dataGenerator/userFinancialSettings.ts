import {getRandomBoolean} from "./tools";
import {getRandomText} from "./texts/texts";
import {getRandomUserAddress} from "./userSettings";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";

export function getRandomUserFinancialSettings(): UserFinancialSettings {
    return new UserFinancialSettings({
        name: getRandomText(1),
        surname: getRandomText(1),
        ico: getRandomText(1),
        dic: getRandomText(1),
        companyName: getRandomText(1),
        isCompany: getRandomBoolean(),
        iban: getRandomText(1),
        swift: getRandomText(1),
        address: getRandomUserAddress(),
        mailingAddress: getRandomUserAddress()
    })
}