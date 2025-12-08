import {
    UserSettingsRequestDto,
    UserSettingsResponseDto
} from "@/src/api/openapi";
import { UserSettings } from "@/src/data/users/userSettings";
import {UserFinancialSettings} from "@/src/data/users/userFinancialSettings";
import {UserFinancialSettingsConverter} from "@/src/converters/users/users-financial-settings-converter";
import {NotificationConverter} from "@/src/converters/notifications/notification-converter";

export class UserSettingsConverter {
    public static toInstance(settings: UserSettingsResponseDto): UserSettings {
        return new UserSettings({
            phoneNumber: settings.phoneNumber || "",
            notifications: settings.notifications.map(NotificationConverter.toInstance),
            userFinancialSettings: settings.financialSettings ? UserFinancialSettingsConverter.toInstance(settings.financialSettings) : UserFinancialSettings.create(),
            transportRequirementsId: settings.transportRequirementsId || null
        })
    }

    public static toServer(settings: UserSettings): UserSettingsRequestDto {
        const financialSettings = settings.userFinancialSettings;
        return {
            userFinancialSettings: UserFinancialSettingsConverter.toServer(financialSettings),
            phoneNumber: settings.phoneNumber,
            notifications: settings.notifications.map(NotificationConverter.toServer)
        }
    }

    public static toJson(settings: UserSettings): UserSettingsResponseDto {
        return {
            financialSettings: UserFinancialSettingsConverter.toJson(settings.userFinancialSettings),
            phoneNumber: settings.phoneNumber,
            notifications: settings.notifications.map(NotificationConverter.toJson),
            transportRequirementsId: settings.transportRequirementsId
        }
    }
}