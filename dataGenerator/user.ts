import {User} from "@/src/data/users/user";
import {getRandomBoolean, getRandomEmail, getRandomEnum, getRandomId} from "./tools";
import {UserRole} from "@/src/api/openapi";
import {UserDetail} from "@/src/data/users/user-detail";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {getRandomText} from "./texts/texts";
import {getRandomTransferInfo, getRandomUserAddress, getTransportRequirements} from "./userSettings";
import {Vehicle} from "@/src/data/users/vehicle";
import {getRandomNumber} from "@/src/utils/common";
import {getRandomVehicle} from "./vehicle";

export function getRandomUser(): User {
    return new User({
        id: getRandomId(),
        email: getRandomEmail(),
        role: getRandomEnum(UserRole)
    })
}

export function getRandomUserDetail(): UserDetail {
    return new UserDetail({
        id: getRandomId()
    })
}

export function getRandomUserAdminDetail(): UserAdminDetail {
    const vehicles: Vehicle[] = [];
    for (let i = 0; i < getRandomNumber(1, 5); i++) {
        vehicles.push(getRandomVehicle())
    }
    return new UserAdminDetail({
        id: getRandomId(),
        email: getRandomEmail(),
        dic: getRandomText(1),
        ico: getRandomText(1),
        address: getRandomUserAddress(),
        mailingAddress: getRandomUserAddress(),
        isActive: getRandomBoolean(),
        isBanned: getRandomBoolean(),
        isCompany: getRandomBoolean(),
        name: getRandomText(1),
        isVerifiedForTransporting: getRandomBoolean(),
        phoneNumber: getRandomText(1),
        surname: getRandomText(1),
        transferInfo: getRandomTransferInfo(),
        vehicles: vehicles,
        transportRequirements: getTransportRequirements()
    })
}