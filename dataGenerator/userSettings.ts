import {UserSettings} from "@/src/data/users/userSettings";
import {getRandomText} from "./texts/texts";
import {getRandomBoolean, getRandomEnum} from "./tools";
import {Country, NotificationsEnum} from "@/src/api/openapi";
import {UserAddress} from "@/src/data/users/userAddress";
import {getRandomUserFinancialSettings} from "@/dataGenerator/userFinancialSettings";
import {getRandomNumber} from "@/src/utils/common";

export const getRandomUserSettings = (): UserSettings => {
    return new UserSettings({
        userFinancialSettings: getRandomUserFinancialSettings(),
        phoneNumber: getRandomText(1),
        notifications: [getRandomEnum(NotificationsEnum), getRandomEnum(NotificationsEnum)],
        transportRequirementsId: getRandomBoolean() ? getRandomNumber(1, 100) : null
    })
}

export const getRandomUserAddress = (): UserAddress => {
    return new UserAddress({
        country: getRandomBoolean() ? getRandomEnum(Country) : null,
        psc: getRandomBoolean() ? getRandomText(1) : "",
        city: getRandomBoolean() ? getRandomText(1) : "",
        street: getRandomBoolean() ? getRandomText(1) : "",
        houseNumber: getRandomBoolean() ? getRandomText(1) : ""
    })
}