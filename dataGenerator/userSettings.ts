import {UserSettings} from "@/src/data/users/userSettings";
import {getRandomText} from "./texts/texts";
import {getRandomBoolean, getRandomEnum} from "./tools";
import {Country} from "@/src/api/openapi";
import {UserAddress} from "@/src/data/users/userAddress";
import {getRandomUserFinancialSettings} from "@/dataGenerator/userFinancialSettings";
import {getRandomNumber} from "@/src/utils/common";
import {Notification} from "@/src/data/notifications/notification";
import {getRandomNotification} from "@/dataGenerator/notifications/notifications";
import {LOCALES} from "@/src/enums/locale";

export const getRandomUserSettings = (): UserSettings => {
    const notifications: Notification[] = [];

    for (let i = 0; i < getRandomNumber(1, 4); i++) {
        notifications.push(getRandomNotification());
    }

    return new UserSettings({
        userFinancialSettings: getRandomUserFinancialSettings(),
        phoneNumber: getRandomText(1),
        notifications: notifications,
        transportRequirementsId: getRandomBoolean() ? getRandomNumber(1, 100) : null,
        locale: getRandomEnum(LOCALES)
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