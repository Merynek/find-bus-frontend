import {UserSettings} from "@/src/data/users/userSettings";
import {getRandomText} from "./texts/texts";
import {getRandomBoolean, getRandomEnum} from "./tools";
import {Country, NotificationsEnum} from "@/src/api/openapi";
import {UserAddress} from "@/src/data/users/userAddress";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {getRandomPhoto} from "./photos/photos";
import {getRandomUserFinancialSettings} from "@/dataGenerator/userFinancialSettings";

export const getRandomUserSettings = (): UserSettings => {
    return new UserSettings({
        userFinancialSettings: getRandomUserFinancialSettings(),
        phoneNumber: getRandomText(1),
        notifications: [getRandomEnum(NotificationsEnum), getRandomEnum(NotificationsEnum)],
        transportRequirements: getTransportRequirements()
    })
}

export const getTransportRequirements = () => {
    return new TransportRequirements({
        concessionNumber: getRandomText(2),
        concessionDocuments: getRandomBoolean() ? null : getRandomPhoto(),
        businessRiskInsurance: getRandomBoolean() ? null : getRandomPhoto()
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