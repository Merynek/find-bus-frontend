import {
    UserSettingsRequestDto,
    UserSettingsResponseDto
} from "@/src/api/openapi";
import { UserSettings } from "@/src/data/users/userSettings";
import {TransportRequirementsConverter} from "@/src/converters/users/transport-requirements-converter";
import {TransportRequirements} from "@/src/data/transportRequirements";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";
import {UserFinancialSettingsConverter} from "@/src/converters/users/users-financial-settings-converter";

export class UserSettingsConverter {
    public static toInstance(settings: UserSettingsResponseDto): UserSettings {
        return new UserSettings({
            phoneNumber: settings.phoneNumber || "",
            notifications: settings.notifications || [],
            transportRequirements: settings.transporterRequirements ? TransportRequirementsConverter.toInstance(settings.transporterRequirements) : TransportRequirements.create(),
            userFinancialSettings: settings.financialSettings ? UserFinancialSettingsConverter.toInstance(settings.financialSettings) : UserFinancialSettings.create()
        })
    }

    public static toServer(settings: UserSettings): UserSettingsRequestDto {
        const financialSettings = settings.userFinancialSettings;
        return {
            userFinancialSettings: UserFinancialSettingsConverter.toServer(financialSettings),
            phoneNumber: settings.phoneNumber,
            transportRequirements: TransportRequirementsConverter.toServer(settings.transportRequirements),
            notifications: settings.notifications
        }
    }

    public static toJson(settings: UserSettings): UserSettingsResponseDto {
        return {
            financialSettings: UserFinancialSettingsConverter.toJson(settings.userFinancialSettings),
            phoneNumber: settings.phoneNumber,
            notifications: settings.notifications,
            transporterRequirements: TransportRequirementsConverter.toJson(settings.transportRequirements),
            isVerifiedForTransporting: false
        }
    }
}