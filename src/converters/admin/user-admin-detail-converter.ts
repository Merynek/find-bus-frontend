import {
    AdminUserDetailResponseDto
} from "@/src/api/openapi";
import {UserAdminDetail} from "@/src/data/users/user-admin-detail";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";
import {UserConfigConverter} from "@/src/converters/admin/user-config-converter";
import {VehicleConverter} from "@/src/converters/vehicle/vehicle-converter";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";
import {UserFinancialSettingsConverter} from "@/src/converters/users/users-financial-settings-converter";

export class UserAdminDetailConverter {

    public static toInstance(response: AdminUserDetailResponseDto): UserAdminDetail {
        return new UserAdminDetail({
            id: response.id,
            email: response.email,
            isActive: response.active,
            isBanned: response.banned,
            userFinancialSettings: response.financialSettings ? UserFinancialSettingsConverter.toInstance(response.financialSettings) : UserFinancialSettings.create(),
            phoneNumber: response.phoneNumber,
            vehicles: response.vehicles.map(VehicleConverter.toInstance),
            transportRequirements: response.transporterRequirements ? TransportRequirementsConverter.toInstance(response.transporterRequirements) : TransportRequirements.create(),
            userConfigs: response.userConfigs.map(UserConfigConverter.toInstance)
        })
    }

    public static toJson(user: UserAdminDetail): AdminUserDetailResponseDto {
        return {
            id: user.id,
            email: user.email,
            active: user.isActive,
            banned: user.isBanned,
            financialSettings: UserFinancialSettingsConverter.toJson(user.userFinancialSettings),
            phoneNumber: user.phoneNumber,
            vehicles: user.vehicles.map(v => VehicleConverter.toJson(v)),
            transporterRequirements: TransportRequirementsConverter.toJson(user.transportRequirements),
            userConfigs: user.userConfigs.map(UserConfigConverter.toJson)
        }
    }
}