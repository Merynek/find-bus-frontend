import {User} from "@/src/data/users/user";
import {getRandomBoolean, getRandomEmail, getRandomEnum, getRandomId} from "./tools";
import {UserRole} from "@/src/api/openapi";
import {UserDetail} from "@/src/data/users/user-detail";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {getRandomText} from "./texts/texts";
import {getRandomNumber} from "@/src/utils/common";
import {getRandomVehicle} from "./vehicle";
import {getRandomUserConfig} from "@/dataGenerator/userConfig";
import {UserConfig} from "@/src/data/userConfig";
import {Vehicle} from "@/src/data/vehicle/vehicle";
import {getRandomUserFinancialSettings} from "@/dataGenerator/userFinancialSettings";

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
    const userConfigs: UserConfig[] = [];
    for (let i = 0; i < getRandomNumber(1, 5); i++) {
        vehicles.push(getRandomVehicle())
    }
    for (let i = 0; i < getRandomNumber(1, 5); i++) {
        userConfigs.push(getRandomUserConfig())
    }
    return new UserAdminDetail({
        id: getRandomId(),
        email: getRandomEmail(),
        userFinancialSettings: getRandomUserFinancialSettings(),
        isActive: getRandomBoolean(),
        isBanned: getRandomBoolean(),
        phoneNumber: getRandomText(1),
        vehicles: vehicles,
        transportRequirementsId: null,
        userConfigs: userConfigs
    })
}