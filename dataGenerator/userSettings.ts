import {UserSettings} from "@/src/data/users/userSettings";
import {getRandomText} from "./texts/texts";
import {getRandomBoolean, getRandomEnum} from "./tools";
import {Country, NotificationsEnum} from "@/src/api/openapi";
import {UserAddress} from "@/src/data/users/userAddress";
import {TransferInfo} from "@/src/data/transferInfo";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {getRandomPhoto} from "./photos/photos";

export const getRandomUserSettings = (): UserSettings => {
    return new UserSettings({
        name: getRandomText(1),
        surname: getRandomText(1),
        phoneNumber: getRandomText(1),
        dic: getRandomText(1),
        ico: getRandomText(1),
        companyName: getRandomText(1),
        notifications: [getRandomEnum(NotificationsEnum), getRandomEnum(NotificationsEnum)],
        address: getRandomUserAddress(),
        mailingAddress: getRandomUserAddress(),
        isCompany: getRandomBoolean(),
        transferInfo: getRandomTransferInfo(),
        transportRequirements: getTransportRequirements(),
        isVerifiedForTransporting: getRandomBoolean()
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

export const getRandomTransferInfo = (): TransferInfo => {
    return new TransferInfo({
        swift: getRandomText(2),
        iban: getRandomText(2)
    })
}